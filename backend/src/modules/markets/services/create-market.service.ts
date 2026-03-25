/**
 * CreateMarketService
 *
 * Handles the business logic for creating a market.
 */

import { AppError } from "../../../shared/errors/app-error";
import { CreateMarketDTO } from "../dtos/create-market.dto";
import { MarketsRepository } from "../repositories/markets.repository";

export class CreateMarketService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(data: CreateMarketDTO) {
    if (data.cnpj) {
      const existingMarket = await this.marketsRepository.findByCnpj(data.cnpj);

      if (existingMarket) {
        throw new AppError("Market with this CNPJ already exists", 409);
      }
    }

    return this.marketsRepository.create({
      ...data,
      displayName: data.displayName ?? data.name,
    });
  }
}