/**
 * UsersRepository
 *
 * Handles read operations related to users.
 * User creation is handled by the auth module.
 */

import { User } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/infra/prisma";

export class UsersRepository {
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