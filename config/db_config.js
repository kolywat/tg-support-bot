import mongoose from "mongoose";
import { ENV } from "./constants.js";

export default async function connectDB() {
  try {
    await mongoose
      .connect(ENV.MONGO_URI)
      .then(() => console.log("MongoDB Connected!"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
