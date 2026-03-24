/**
 * ReceiptsRepository
 *
 * Handles all database operations related to receipts.
 * This repository centralizes receipt persistence and query behavior.
 */

import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/infra/prisma";

export class ReceiptsRepository {
  async create(data: Prisma.ReceiptCreateInput) {
    return prisma.receipt.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        market: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.receipt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        market: true,
        items: {
          include: {
            product: true,
            priceRecords: true,
          },
        },
      },
    });
  }

  async findByExternalCode(externalCode: string) {
    return prisma.receipt.findUnique({
      where: { externalCode },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        market: true,
        items: true,
      },
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    limit: number,
    skip: number
  ) {
    const [receipts, total] = await Promise.all([
      prisma.receipt.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          market: true,
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          purchasedAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.receipt.count({
        where: { userId },
      }),
    ]);

    return {
      receipts,
      total,
      page,
      limit,
    };
  }
}