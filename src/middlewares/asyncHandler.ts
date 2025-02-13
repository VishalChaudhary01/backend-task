import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "./isAuth";

export const asyncHandler = (fn: (req: Request | IAuthRequest, res: Response, next: NextFunction) => Promise<void>) => {
     return (req: Request | IAuthRequest, res: Response, next: NextFunction) => {
          fn(req, res, next).catch(next);
     };
};


