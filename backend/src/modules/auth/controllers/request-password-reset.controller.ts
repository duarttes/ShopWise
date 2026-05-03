import { Request, Response } from "express";
import { z } from "zod";
import { RequestPasswordResetService } from "../services/request-password-reset.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";

const schema = z.object({ email: z.string().email() });

export async function requestPasswordResetController(req: Request, res: Response) {
  const { email } = schema.parse(req.body);
  await new RequestPasswordResetService().execute(email);
  return res.json(buildSuccessResponse({
    message: "Se este email estiver cadastrado, você receberá um link em breve.",
    data: null,
  }));
}