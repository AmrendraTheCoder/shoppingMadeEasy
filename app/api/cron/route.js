import { NextResponse } from "next/server";

import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifType,
} from "@/lib/utils";
import { connectDb } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 60; // Limit duration to 60 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    connectDb();

    // Fetch products in small batches
    const batchSize = 10; // Adjust based on average execution time
    const products = await Product.find({}).limit(batchSize);

    if (!products || products.length === 0) {
      throw new Error("No products to process");
    }

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        try {
          // Scrape product
          const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

          if (!scrapedProduct) return;

          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ];

          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          };

          // Update Products in DB
          const updatedProduct = await Product.findOneAndUpdate(
            { url: product.url },
            product
          );

          // Check email notification status
          const emailNotifType = getEmailNotifType(
            scrapedProduct,
            currentProduct
          );

          if (emailNotifType && updatedProduct?.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url,
            };
            const emailContent = await generateEmailBody(
              productInfo,
              emailNotifType
            );
            const userEmails = updatedProduct.users.map((user) => user.email);
            await sendEmail(emailContent, userEmails);
          }

          return updatedProduct;
        } catch (error) {
          console.error(
            `Error processing product ${currentProduct._id}: ${error}`
          );
          return null;
        }
      })
    );

    return NextResponse.json({
      message: "Processed batch successfully",
      data: updatedProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to process batch: ${error.message}` },
      { status: 500 }
    );
  }
}
