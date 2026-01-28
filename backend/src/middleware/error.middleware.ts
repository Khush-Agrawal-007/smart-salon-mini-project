import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Use a custom AppError class for operational errors
export class AppError extends Error {
    statusCode: number;
    status: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const globalErrorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = (err as AppError).statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Zod Validation Errors
    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        return res.status(statusCode).json({
            status: 'fail',
            message,
            errors: (err as any).errors.map((e: any) => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }

    // Handle Mongoose Cast Errors (Invalid ID)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${(err as any).path}: ${(err as any).value}`;
    }

    // Handle Mongoose Duplicate Key Errors
    if (err.name === 'MongoServerError' && (err as any).code === 11000) {
        statusCode = 400;
        const field = Object.keys((err as any).keyValue)[0];
        message = `Duplicate field value: ${field}. Please use another value!`;
    }

    // Send Error Response
    res.status(statusCode).json({
        status: (err as AppError).status || 'error',
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
