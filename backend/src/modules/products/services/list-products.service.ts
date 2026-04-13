/**
 * ListProductsService
 *
 * Returns all products currently stored in the system.
 */

import { Product } from "../../../../generated/prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

export class ListProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(category?: string): Promise<Product[]> {
    return this.productsRepository.findMany(category);
  }
}