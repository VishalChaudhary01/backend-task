import { ERROR_CODE, ERROR_NAME } from "../config/error";

export class AppError extends Error {
     public name: string;
     public statusCode: number;
     public success: boolean;
     public error: any;

     constructor(message: string, statusCode: keyof typeof ERROR_CODE, error?: any) {
          super(message);
          this.success = false;
          this.name = ERROR_NAME[statusCode];
          this.statusCode = ERROR_CODE[statusCode];
          this.error = error;
          Object.setPrototypeOf(this, AppError.prototype);
     }
}
