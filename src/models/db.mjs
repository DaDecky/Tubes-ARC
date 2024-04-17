import mongoose from "mongoose";

// const connectionString = 'mongodb://localhost:27017/blogdata';
const connectionString =
  // "mongodb+srv://david:david@tubes-arc.rg4xq0n.mongodb.net/";
  "mongodb+srv://server:QxTKe3rgvQW5tKKk@tubes-arc.rg4xq0n.mongodb.net/?retryWrites=true&w=majority&appName=Tubes-ARC";
// "mongodb+srv://david:david@tubes-arc.rg4xq0n.mongodb.net/?retryWrites=true&w=majority&appName=Tubes-ARC";
// mongodb+srv://<username>:<password>@tubes-arc.rg4xq0n.mongodb.net/
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
