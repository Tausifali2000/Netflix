import dotenv from "dotenv"; //dotenv package

dotenv.config(); //dotenv initiated

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
}