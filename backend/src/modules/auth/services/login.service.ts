/**
 * LoginService
 *
 * Authenticates a user using email and password,
 * then returns a signed JWT token.
 */

import bcrypt from "bcryptjs";
import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { signToken } from "../../../shared/utils/jwt";
import { LoginDTO } from "../dtos/login.dto";

export class LoginService {
  async execute(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!passwordMatches) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}