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
        user: true,
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
        user: true,
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

  async findMany(page: number, limit: number, skip: number) {
    const [receipts, total] = await Promise.all([
      prisma.receipt.findMany({
        include: {
          user: true,
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
      prisma.receipt.count(),
    ]);

    return {
      receipts,
      total,
      page,
      limit,
    };
  }
}