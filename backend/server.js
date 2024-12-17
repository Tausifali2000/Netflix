import express from "express"; //es Modules

import authRoutes from "./routes/auth.js"; //Authentication routes
import movieRoutes from "./routes/movie.route.js";

import { ENV_VARS } from "./config/envVars.js"; //Constant .env variales
import { connectDB } from "./config/db.js"; //connnection function


const app = express()

const PORT = ENV_VARS.PORT //Fetiching port value

app.use(express.json()) //Middleware - parser allows us to use req.body



app.use("/api/v1/auth", authRoutes); //url prefix
app.use("/api/v1/movie", movieRoutes); 



app.listen(PORT, ()=> {
  console.log("Server started at", PORT);
  connectDB();
})

