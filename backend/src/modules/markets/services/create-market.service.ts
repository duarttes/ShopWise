/**
 * CreateMarketService
 *
 * Handles the business logic for creating a new market.
 * In the MVP, the main business rule is preventing duplicated CNPJ values.
 */

import { Market } from "../../../../generated/prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { CreateMarketDTO } from "../dtos/create-market.dto";
import { MarketsRepository } from "../repositories/markets.repository";

export class CreateMarketService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(data: CreateMarketDTO): Promise<Market> {
    if (data.cnpj) {
      const existingMarket = await this.marketsRepository.findByCnpj(data.cnpj);

      if (existingMarket) {
        throw new AppError("CNPJ is already in use", 409);
      }
    }

    return this.marketsRepository.create(data);
  }
}