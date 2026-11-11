import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import roomRoute from "./routes/room.routes"
import tenantRoute from "./routes/tenant.routes"
dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())
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

app.use('/api/room', roomRoute)
app.use('/api/tenant', tenantRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})