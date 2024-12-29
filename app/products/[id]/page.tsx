import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Resolve the params promise
  const { slug } = await params;

  // Extract the product ID from the slug array
  const productID = slug[1];

  // Fetch product details
  const product: Product | null = await getProductById(productID);

  // Redirect to the homepage if no product is found
  if (!product) {
    redirect("/");
    return null;
  }

  // Fetch similar products
  const similarProducts = await getSimilarProducts(productID);

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Product Title and Details */}
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/red-heart.svg"
                alt="heart"
                width={20}
                height={20}
              />
              <p className="text-base font-semibold text-[#D46F77]">
                {product.reviewsCount}
              </p>
            </div>
          </div>

          {/* Product Pricing Info */}
          <div className="product-info">
            <p className="text-[34px] text-secondary font-bold">
              {product.currency} {formatNumber(product.currentPrice)}
            </p>
            {product.originalPrice && (
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            )}
          </div>

          {/* Price Cards */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          {/* Modal */}
          <Modal productId={productID} />
        </div>
      </div>

      {/* Product Description */}
      <div className="flex flex-col gap-16">
        <h3 className="text-2xl text-secondary font-semibold">
          Product Description
        </h3>
        <div className="flex flex-col gap-4">
          {product.description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
