import { ERROR_CODE, ERROR_NAME } from "../config/error";
import { AppError } from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { IAuthRequest } from "./isAuth";

export const errorHandler = (error: Error, req: Request | IAuthRequest, res: Response, next: NextFunction) => {
     console.log('❌ Error Details: ', error);
     if (error instanceof AppError) {
          res.status(error.statusCode).json({ success: false, name: error.name, message: error.message, error: error.error, ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) });
          return;
     }
     if (error instanceof ZodError) {
          res.status(ERROR_CODE.VALIDATION_ERROR).json({ success: false, name: ERROR_NAME.VALIDATION_ERROR, message: error.issues[0].message })
          return;
     }
     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
     res.status(statusCode).json({ success: false, name: error.name || ERROR_NAME.INTERNAL_SERVER_ERROR, message: error.message || 'Something went wrong!', ...(process.env.NODE_ENV === 'development' && { stack: error.stack }) });
     return;
}