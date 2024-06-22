import "dotenv/config"
import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI; // Replace with your actual connection string

const connect = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application on connection failure
  }
};

export {connect}
