/**
 * RegisterController
 *
 * Handles the HTTP request for user registration.
 */

import { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema";
import { RegisterService } from "../services/register.service";

export async function registerController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = registerSchema.parse(request.body);

  const registerService = new RegisterService();
  const result = await registerService.execute(data);

  return response.status(201).json(result);
}