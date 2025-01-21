import mongoose from "mongoose";

const dbURI: string = `${process.env.MONGODB_URI}`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      dbName: "DraftMailX",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
