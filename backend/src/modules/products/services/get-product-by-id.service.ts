/**
 * GetProductByIdService
 *
 * Retrieves a single product by its unique identifier.
 */

import { Product } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { ProductsRepository } from "../repositories/products.repository";

export class GetProductByIdService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}