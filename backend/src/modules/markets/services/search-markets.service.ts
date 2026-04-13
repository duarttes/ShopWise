/**
 * SearchMarketsService
 *
 * Searches markets using a free-text query.
 * This is useful for autocomplete and market selection flows.
 */

import { AppError } from "../../../shared/errors/app-error";
import { MarketsRepository } from "../repositories/markets.repository";

export class SearchMarketsService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(query?: string) {
    const sanitizedQuery = query?.trim();

    if (!sanitizedQuery) {
      throw new AppError("Query parameter is required", 400);
    }

    return this.marketsRepository.search(sanitizedQuery);
  }
}