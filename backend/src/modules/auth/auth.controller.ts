import type { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service.js';
import { ApiResponse } from '../../common/utils/api-response.js';

export class AuthController {
  public static createUserWithEmailAndPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newUser = await AuthService.createUserWithEmailAndPassword(req.body);
      return ApiResponse.created(res, 'User registerd successfully', newUser);
    } catch (error) {
      next(error);
    }
  };
}
