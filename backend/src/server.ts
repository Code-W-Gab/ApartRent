import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

connectDB();

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is running!",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})