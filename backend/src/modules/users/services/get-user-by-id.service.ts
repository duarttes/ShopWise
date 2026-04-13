/**
 * GetUserByIdService
 *
 * Retrieves a single user by its unique identifier.
 */

import { User } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { UsersRepository } from "../repositories/users.repository";

export class GetUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}