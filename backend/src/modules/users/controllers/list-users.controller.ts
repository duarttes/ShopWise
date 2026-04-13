/**
 * ListUsersController
 *
 * Handles the HTTP request for listing all users.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { ListUsersService } from "../services/list-users.service";
import { UsersRepository } from "../repositories/users.repository";

export async function listUsersController(
  _request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const listUsersService = new ListUsersService(usersRepository);

  const users = await listUsersService.execute();

  return response.status(200).json(
    buildSuccessResponse({
      message: "Users retrieved successfully",
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    })
  );
}