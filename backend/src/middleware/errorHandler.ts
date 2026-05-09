import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';
import { env } from '../config/env';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default error values
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'An unexpected error occurred';
  let details: unknown = null;

  // Handle custom AppErrors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.code;
    message = err.message;
    if ('details' in err) {
      details = err.details;
    }
  } else if (err.name === 'PrismaClientKnownRequestError') {
    // Handle Prisma errors
    statusCode = 400;
    errorCode = 'DATABASE_ERROR';
    message = 'Database operation failed';
    
    // @ts-expect-error Prisma error code
    if (err.code === 'P2002') {
      errorCode = 'DUPLICATE_ENTRY';
      message = 'A record with this information already exists';
    }
    // @ts-expect-error Prisma error code
    if (err.code === 'P2025') {
      errorCode = 'NOT_FOUND';
      statusCode = 404;
      message = 'Record not found';
    }
  } else if (err.name === 'ValidationError') {
    statusCode = 422;
    errorCode = 'VALIDATION_ERROR';
    message = err.message;
  }

  // Log error
  const logLevel = statusCode >= 500 ? 'error' : 'warn';
  logger[logLevel]({
    message: err.message,
    statusCode,
    errorCode,
    stack: err.stack,
    // @ts-expect-error Prisma error code
    prismaCode: err.code,
  });

  // Send response
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
      ...(env.NODE_ENV === 'development' && {
        stack: err.stack,
      }),
    },
  };

  res.status(statusCode).json(response);
};

// Handle 404 errors for undefined routes
export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  };
  res.status(404).json(response);
};

// Async handler wrapper to avoid try-catch blocks in controllers
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
