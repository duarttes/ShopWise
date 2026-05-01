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

    async updateDisplayName(id: string, displayName: string): Promise<Market> {
    return prisma.market.update({
      where: { id },
      data: {
        displayName,
      },
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

  async updateCoordinates(
    id: string,
    latitude: number,
    longitude: number
  ): Promise<Market> {
    return prisma.market.update({
      where: { id },
      data: {
        latitude,
        longitude,
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
            displayName: {
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
        displayName: "asc",
      },
      take: 20,
    });
  }

  async findAll() {
  return prisma.market.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      displayName: true,
      city: true,
      state: true,
      address: true,
      latitude: true,
      longitude: true,
    },
  });
}
}