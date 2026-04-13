/**
 * ProductsRepository
 *
 * Handles all database operations related to products.
 * This repository is the only place in this module that should talk directly to Prisma.
 */

import { Product } from "../../../../generated/prisma/client";
import { prisma } from "../../../shared/infra/prisma";
import { CreateProductDTO } from "../dtos/create-product.dto";

export class ProductsRepository {
  async create(data: CreateProductDTO): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async findByNormalizedName(normalizedName: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { normalizedName },
    });
  }

  async findMany(category?: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async search(query: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            normalizedName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
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

  async findPriceHistoryByProductId(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        normalizedName: true,
        brand: true,
        category: true,
        unit: true,
        priceRecords: {
          orderBy: {
            observedAt: "asc",
          },
          select: {
            id: true,
            price: true,
            observedAt: true,
            market: {
              select: {
                id: true,
                name: true,
                displayName: true,
                city: true,
                state: true,
              },
            },
          },
        },
      },
    });
  }
}