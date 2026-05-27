import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../common/config/db.js';
import { users } from './user.model.js';
import { ApiError } from '../../common/exceptions/api-error.js';
import type { LoginDto, RegisterDto } from './dto/auth.dto.js';
import { UserRepository } from './user.repository.js';
import { PasswordUtil } from '../../common/utils/password.util.js';
import { JwtUtil } from '../../common/utils/jwt.util.js';

export class AuthService {
  public static async createUserWithEmailAndPassword(data: RegisterDto) {
    const existingUser = await UserRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new ApiError(400, 'A user with this email already exists');
    }

    const hashedPassword = await PasswordUtil.hash(data.password);

    const newUser = await UserRepository.insertUser({
      ...data,
      password: hashedPassword,
    });

    return {
      id: newUser?.id,
      fullName: newUser?.fullName,
      email: newUser?.email,
      createdAt: newUser?.createdAt,
    };
  }

  public static async loginWithEmailAndPassword(data: LoginDto) {
    const user = await UserRepository.findUserByEmail(data.email);
    if (!user || !user.password) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await PasswordUtil.compare(user.password, data.password);
    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const accessToken = JwtUtil.generateAccessToken(user.id);
    const refreshToken = JwtUtil.generateRefreshToken(user.id);

    await UserRepository.updateUser(user.id, { refreshToken, updatedAt: new Date() });

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
