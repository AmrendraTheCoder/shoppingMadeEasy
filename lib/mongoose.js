import mongoose from "mongoose";

// MongoDB connection URI (Make sure you have this in your environment variables)
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Mongoose connection logic
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    // Already connected
    console.log("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDb;
