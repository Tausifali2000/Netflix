import express from "express"; //es Modules
import authRoutes from "./routes/auth.js"; //Authentication routes

const app = express()

app.use("/api/v1/auth", authRoutes);


app.listen(5000, ()=> {
  console.log("Server started at 5000")
})