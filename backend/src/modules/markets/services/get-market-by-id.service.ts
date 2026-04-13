/**
 * GetMarketByIdService
 *
 * Retrieves a single market by its unique identifier.
 */

import { Market } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { MarketsRepository } from "../repositories/markets.repository";

export class GetMarketByIdService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(id: string): Promise<Market> {
    const market = await this.marketsRepository.findById(id);

    if (!market) {
      throw new AppError("Market not found", 404);
    }

    return market;
  }
}