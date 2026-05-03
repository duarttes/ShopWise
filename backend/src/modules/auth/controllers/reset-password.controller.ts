import { Request, Response } from "express";
import { z } from "zod";
import { ResetPasswordService } from "../services/reset-password.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";

const schema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export async function resetPasswordController(req: Request, res: Response) {
  const { token, password } = schema.parse(req.body);
  await new ResetPasswordService().execute(token, password);
  return res.json(buildSuccessResponse({
    message: "Senha redefinida com sucesso.",
    data: null,
  }));
}