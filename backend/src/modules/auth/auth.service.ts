import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../../common/config/db.js';
import { users } from './user.model.js';
import { ApiError } from '../../common/exceptions/api-error.js';
import type { RegisterDto } from './dto/auth.dto.js';

export class AuthService {
  public static async register(data: RegisterDto) {
    const existingUser = await db.select().from(users).where(eq(users.email, data.email));

    if (existingUser.length > 0) {
      throw new ApiError(400, 'A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
      })
      .returning();

    return {
      id: newUser?.id,
      fullName: newUser?.fullName,
      email: newUser?.email,
      createdAt: newUser?.createdAt,
    };
  }
}
