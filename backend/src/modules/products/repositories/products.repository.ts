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

  async findMany(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}