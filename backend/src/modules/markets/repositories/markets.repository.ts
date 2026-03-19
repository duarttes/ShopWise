/**
 * MarketsRepository
 *
 * Handles all database operations related to markets.
 * This repository is the only place in this module that should talk directly to Prisma.
 */

import { Market } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/infra/prisma";
import { CreateMarketDTO } from "../dtos/create-market.dto";

export class MarketsRepository {
  async create(data: CreateMarketDTO): Promise<Market> {
    return prisma.market.create({
      data,
    });
  }

  async findById(id: string): Promise<Market | null> {
    return prisma.market.findUnique({
      where: { id },
    });
  }

  async findByCnpj(cnpj: string): Promise<Market | null> {
    return prisma.market.findUnique({
      where: { cnpj },
    });
  }

  async findMany(city?: string): Promise<Market[]> {
    return prisma.market.findMany({
      where: city
        ? {
            city: {
              equals: city,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async search(query: string): Promise<Market[]> {
    return prisma.market.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            cnpj: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            state: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
      take: 20,
    });
  }
}