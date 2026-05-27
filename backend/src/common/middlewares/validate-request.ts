import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { ApiError } from '../exceptions/api-error.js';

export const validateRequest = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate body, query, and params all at once
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors
          .map((issue) => `${issue.path.join('.')} is ${issue.message}`)
          .join(', ');

        // Pass our custom ApiError to the global error handler
        return next(ApiError.badRequest(errorMessages));
      }

      return next(ApiError.internal('Unexpected validation error'));
    }
  };
};
