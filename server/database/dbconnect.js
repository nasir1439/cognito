import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectdb;
