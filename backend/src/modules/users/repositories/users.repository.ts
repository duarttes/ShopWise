/**
 * UsersRepository
 *
 * Handles read and profile update operations related to users.
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

  async updateRecommendationStrategy(
    id: string,
    recommendationStrategy: "balanced" | "cheapest" | "closest"
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        recommendationStrategy,
      },
    });
  }

  async updateLocation(
    id: string,
    homeLatitude: number,
    homeLongitude: number
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        homeLatitude,
        homeLongitude,
      },
    });
  }
}