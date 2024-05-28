import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { setupRoutes } from "./src/routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/src/uploads", express.static("src/uploads"));

setupRoutes(app);

const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
