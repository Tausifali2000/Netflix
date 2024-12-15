import mongoose from "mongoose"; //Mongoose package import used for connecting to mongoDB
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {

  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
    console.log("MONGODB connected: " + conn.connection.host)
  } catch(error) {
    console.error("Error connecting to MONGODB: " + error.message);
    process.exit(1); //1 means error 0 means success
  }
}