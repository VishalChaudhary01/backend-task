import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import { AppError } from '../utils/appError';

export interface IAuthRequest extends Request {
     userId?: string;
}

export const isAuth = asyncHandler(async (req: IAuthRequest, res: Response, next: NextFunction) => {
     const cookie = req.signedCookies[`${process.env.COOKIE_NAME!}`];
     if (!cookie || !cookie.token) {
          throw new AppError('Please login to access this resource', 'UNAUTHORIZED');
     }
     try {
          jwt.verify(cookie.token, process.env.JWT_SECRET!, function(err: any, decoded: any) {
               if (err) throw new AppError('Authentication failed', 'AUTHENTICATION_FAILED');
               const user = decoded as JwtPayload;
               if (!user || !user.id) throw new AppError('Invalid token', 'INSUFFICIENT_PERMISSIONS');
               req.userId = user.id;
               next();
          });
     } catch (error) {
          throw new AppError('Authentication failed', 'AUTHENTICATION_FAILED');
     }
});