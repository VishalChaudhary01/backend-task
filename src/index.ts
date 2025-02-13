import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
