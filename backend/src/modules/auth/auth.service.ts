import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../common/config/db.js';
import { users } from './user.model.js';
import { ApiError } from '../../common/exceptions/api-error.js';
import type { RegisterDto } from './dto/auth.dto.js';
import { UserRepository } from './user.repository.js';
import { PasswordUtil } from '../../common/utils/password.util.js';

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
}
