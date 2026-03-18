/**
 * CreateProductService
 *
 * Handles the business logic for creating a new product.
 * In the MVP, the main business rule is preventing duplicated normalized names.
 */

import { Product } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { ProductsRepository } from "../repositories/products.repository";

export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    const existingProduct = await this.productsRepository.findByNormalizedName(
      data.normalizedName
    );

    if (existingProduct) {
      throw new AppError("Normalized product name is already in use", 409);
    }

    return this.productsRepository.create(data);
  }
}