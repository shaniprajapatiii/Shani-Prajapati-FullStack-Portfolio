import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not Found'));
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
