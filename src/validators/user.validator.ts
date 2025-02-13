import { z } from "zod";

export const registerValidator = z.object({
  fullName: z
    .string({ message: "Full name is required" })
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(32, { message: "Full name must be less than 32 characters long" })
    .trim(),
  username: z
    .string({ message: "Username is required" })
    .email({ message: "Invalid email" })
    .min(1, { message: "Username is required" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .max(32, { message: "Password must be less than 32 characters long" }),
  gender: z
    .enum(["male", "female", "other"])
    .refine((val) => val === "male" || val === "female" || val === "other", {
      message: "Invalid gender",
    }),
  dateOfBirth: z
    .string({ message: "Date of birth is required" })
    .min(1, { message: "Date of birth is required" })
    .trim(),
  country: z
    .string({ message: "Country is required" })
    .min(1, { message: "Country is required" })
    .max(32, { message: "Country must be less than 32 characters long" })
    .trim(),
});

export const loginValidator = z.object({
  username: z
    .string({ message: "Username is required" })
    .email({ message: "Invalid email" })
    .min(1, { message: "Username is required" }),
  password: z.string({ message: "Password is required" }),
});
