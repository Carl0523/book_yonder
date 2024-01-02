import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/auth.route";

// Set up the connection with mongo db
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connect to MongoDB database successfully"))
  .catch((error) => console.log(error));

const app = express();

// Parse incoming json request and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //

// Allow cross origin resources sharing (cors)
app.use(cors());
app.use(cookieParser());

// Set up routers
app.use("/api/auth", authRouter);

// Middleware function to handle the error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.errorMessage || "Internal Server Error";
  res.status(statusCode).json({
    message: errorMessage,
    statusCode,
  });
  next();
});

// Server run on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
