import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export class RequestPasswordResetService {
  async execute(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    // Não revela se o email existe ou não — segurança
    if (!user) return;

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.passwordResetToken.upsert({
      where: { userId: user.id },
      update: { token, expiresAt, used: false },
      create: { userId: user.id, token, expiresAt, used: false },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "ShopWise <noreply@shopwise.app>",
      to: email,
      subject: "Redefinição de senha — ShopWise",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #2d7a4a;">ShopWise</h2>
          <p>Você solicitou a redefinição da sua senha.</p>
          <p>Clique no botão abaixo para criar uma nova senha. O link expira em <strong>1 hora</strong>.</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            margin: 24px 0;
            padding: 12px 28px;
            background: #2d7a4a;
            color: #fff;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
          ">Redefinir senha</a>
          <p style="color: #999; font-size: 12px;">Se você não solicitou isso, ignore este email.</p>
        </div>
      `,
    });
  }
}