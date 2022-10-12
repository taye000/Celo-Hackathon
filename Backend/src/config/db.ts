import { connect } from "mongoose";
import { config } from "./config";

export const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      connectTimeOutMS: 60000,
      socketTimeOutMS: 60000,
    };
    const db = await connect(config.MONGO_URI, options);
    console.log("connected to DB");
    return db;
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};
