import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/appError";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy server");
});

app.get("*", (req: Request, res: Response) => {
  throw new AppError("Not found", "NOT_FOUND");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
