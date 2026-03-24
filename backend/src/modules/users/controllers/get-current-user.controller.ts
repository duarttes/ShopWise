/**
 * GetCurrentUserController
 *
 * Returns the currently authenticated user.
 */

import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { UsersRepository } from "../repositories/users.repository";

export async function getCurrentUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(request.user!.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return response.status(200).json(
    buildSuccessResponse({
      message: "Current user retrieved successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  );
}