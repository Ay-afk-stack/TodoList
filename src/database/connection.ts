import mongoose from "mongoose";
import envConfig from "../config/config";

const connecttoDatabase = async () => {
  try {
    await mongoose.connect(envConfig.connectionString as string);
    console.log("Database connection successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connecttoDatabase;
