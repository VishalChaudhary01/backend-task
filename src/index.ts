import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import { AppError } from "./utils/appError";
import userRoutes from "./routes/user.route";
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET!));

app.use("/api/users", userRoutes);

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
