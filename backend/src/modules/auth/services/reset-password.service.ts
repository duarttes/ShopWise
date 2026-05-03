import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import bcrypt from "bcryptjs";

export class ResetPasswordService {
  async execute(token: string, newPassword: string) {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) throw new AppError("Token inválido", 400);
    if (resetToken.used) throw new AppError("Token já utilizado", 400);
    if (resetToken.expiresAt < new Date()) throw new AppError("Token expirado", 400);

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: hashed },
    });

    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });
  }
}