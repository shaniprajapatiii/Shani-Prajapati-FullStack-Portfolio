import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateResource = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err) {
      next(new ApiError(400, 'Validation error', err));
    }
  };
};
