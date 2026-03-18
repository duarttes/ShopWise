/**
 * UsersRepository
 *
 * Handles all database operations related to users.
 * This repository is the only place in this module that should talk directly to Prisma.
 */

import { User } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/infra/prisma";
import { CreateUserDTO } from "../dtos/create-user.dto";

export class UsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findMany(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}