import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";

interface IUser extends Document {
     fullName: string;
     username: string;
     password: string;
     gender: "male" | "female" | "other";
     dateOfBirth: string;
     country: string;
     comparePassword(password: string): Promise<boolean>;
     generateTokenAndSaveCookie(res: Response): void;
}

const userSchema = new mongoose.Schema<IUser>({
     fullName: { type: String, required: true },
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     gender: { type: String, required: true, enum: ["male", "female", "other"] },
     dateOfBirth: { type: String, required: true },
     country: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
});

userSchema.methods.comparePassword = async function (password: string) {
     return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateTokenAndSaveCookie = function (res: Response) {
     const token = jwt.sign({ id: this._id, fullName: this.fullName, username: this.username }, process.env.JWT_SECRET!, { expiresIn: '1d' });
     res.cookie(process.env.COOKIE_NAME!, { token: token }, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax',
          signed: true,
     });
};

export const User = mongoose.model<IUser>("User", userSchema);
