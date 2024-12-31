 // Import the mongoose connection helper
import mongoose from "mongoose"; // Import mongoose
import connectDb from './mongoose'
// Ensure database connection before defining the model
connectDb()
  .then(() => {
    const productSchema = new mongoose.Schema(
      {
        url: { type: String, required: true, unique: true },
        currency: { type: String, required: true },
        image: { type: String, required: true },
        title: { type: String, required: true },
        currentPrice: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        priceHistory: [
          {
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now },
          },
        ],
        lowestPrice: { type: Number },
        highestPrice: { type: Number },
        averagePrice: { type: Number },
        discountRate: { type: Number },
        description: { type: String },
        category: { type: String },
        reviewsCount: { type: Number },
        isOutOfStock: { type: Boolean, default: false },
        users: [{ email: { type: String, required: true } }],
        default: [],
      },
      { timestamps: true }
    );

    // Define the model after the connection is established
    const Product =
      mongoose.models.Product || mongoose.model("Product", productSchema);
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
  
  export default Product;
