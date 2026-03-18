/**
 * CreateUserService
 *
 * Handles the business logic for creating a new user.
 * This service validates business rules that go beyond schema validation,
 * such as checking if the email is already in use.
 */

import { User } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UsersRepository } from "../repositories/users.repository";

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email is already in use", 409);
    }

    return this.usersRepository.create(data);
  }
}