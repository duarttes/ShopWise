/**
 * CreateUserController
 *
 * Handles the HTTP request for creating a new user.
 * This controller validates the request payload and delegates
 * the business logic to the service layer.
 */

import { Request, Response } from "express";
import { CreateUserService } from "../services/create-user.service";
import { UsersRepository } from "../repositories/users.repository";
import { createUserSchema } from "../schemas/user.schema";

export async function createUserController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createUserSchema.parse(request.body);

  const usersRepository = new UsersRepository();
  const createUserService = new CreateUserService(usersRepository);

  const user = await createUserService.execute(data);

  return response.status(201).json(user);
}