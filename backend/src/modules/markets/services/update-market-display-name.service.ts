/**
 * UpdateMarketDisplayNameService
 *
 * Updates the display name of a market while keeping the legal name intact.
 */

import { AppError } from "../../../shared/errors/app-error";
import { UpdateMarketDisplayNameDTO } from "../dtos/update-market-display-name.dto";
import { MarketsRepository } from "../repositories/markets.repository";

export class UpdateMarketDisplayNameService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(id: string, data: UpdateMarketDisplayNameDTO) {
    const market = await this.marketsRepository.findById(id);

    if (!market) {
      throw new AppError("Market not found", 404);
    }

    const updatedMarket = await this.marketsRepository.updateDisplayName(
      id,
      data.displayName
    );

    return updatedMarket;
  }
}