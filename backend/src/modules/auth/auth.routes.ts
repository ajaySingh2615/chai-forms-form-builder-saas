import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from '../../common/middlewares/validate-request.js';
import { loginSchema, registerSchema } from './dto/auth.dto.js';

const router = Router();

router.post(
  '/register',
  validateRequest(registerSchema),
  AuthController.createUserWithEmailAndPassword,
);

router.post('/login', validateRequest(loginSchema), AuthController.loginWithEmailAndPassword);

export const authRoutes: Router = router;
