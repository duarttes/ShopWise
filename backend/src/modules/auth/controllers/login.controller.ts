/**
 * LoginController
 *
 * Handles the HTTP request for user authentication.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { loginSchema } from "../schemas/auth.schema";
import { LoginService } from "../services/login.service";

export async function loginController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = loginSchema.parse(request.body);

  const loginService = new LoginService();
  const result = await loginService.execute(data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "User authenticated successfully",
      data: result,
    })
  );
}