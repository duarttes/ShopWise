/**
 * ListUsersService
 *
 * Returns all users currently stored in the system.
 */

import { User } from "../../../../generated/prisma/client";
import { UsersRepository } from "../repositories/users.repository";

export class ListUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findMany();
  }
}