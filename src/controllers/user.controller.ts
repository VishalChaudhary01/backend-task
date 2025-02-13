import { Request, Response } from "express";
import { User } from "../models/user.model";
import { AppError } from "../utils/appError";
import { asyncHandler } from "../middlewares/asyncHandler";
import { loginValidator, registerValidator } from "../validators/user.validator";

export const register = asyncHandler(async (req: Request, res: Response) => {
     const data = registerValidator.parse(req.body);
     const user = await User.findOne({ username: data.username });
     if (user) throw new AppError("User already exists", "BAD_REQUEST");
     const newUser = await User.create(data);
     newUser.generateTokenAndSaveCookie(res);
     res.status(201).json({ success: true, message: "User registered successfully", user: {
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          dateOfBirth: newUser.dateOfBirth,
          country: newUser.country,
     } });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
     const data = loginValidator.parse(req.body);
     const user = await User.findOne({ username: data.username });
     if (!user) throw new AppError("User not found", "NOT_FOUND");
     const isPasswordCorrect = await user.comparePassword(data.password);
     if (!isPasswordCorrect) throw new AppError("Invalid password", "BAD_REQUEST");
     user.generateTokenAndSaveCookie(res);
     res.status(200).json({ success: true, message: "User logged in successfully", user: {
          fullName: user.fullName,
          username: user.username,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          country: user.country,
     } });
});

export const searchUser = asyncHandler(async (req: Request, res: Response) => {
     const { fullName = '', username = '' } = req.query as { fullName: string, username: string };
     if (!fullName && !username) throw new AppError("Provide at least one search parameter (fullName or username)", "BAD_REQUEST");
     const filter: any = {};
     if (fullName) {
          filter.fullName = { $regex: `^${fullName}`, $options: 'i' };
     }
     if (username) {
          filter.username = { $regex: `^${username}`, $options: 'i' };
     }
     const users = await User.find(filter);
     if (!users.length) {
          res.status(200).json({ success: true, message: "No users found for given search" });
          return;
     }
     res.status(200).json({
          success: true,
          message: "Users found",
          users: users.map((user) => ({
               fullName: user.fullName,
               username: user.username,
               gender: user.gender,
               dateOfBirth: user.dateOfBirth,
               country: user.country,
          })),
     });
});


