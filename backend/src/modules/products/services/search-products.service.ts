/**
 * SearchProductsService
 *
 * Searches products using a free-text query.
 * This is useful for autocomplete and product selection flows.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ProductsRepository } from "../repositories/products.repository";

export class SearchProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(query?: string) {
    const sanitizedQuery = query?.trim();

    if (!sanitizedQuery) {
      throw new AppError("Query parameter is required", 400);
    }

    return this.productsRepository.search(sanitizedQuery);
  }
}