/**
 * UpdateMarketDisplayNameService
 *
 * Updates the display name of a market while keeping the legal name intact.
 * Normalizes the display name to Title Case regardless of user input.
 */

import { AppError } from "../../../shared/errors/app-error";
import { UpdateMarketDisplayNameDTO } from "../dtos/update-market-display-name.dto";
import { MarketsRepository } from "../repositories/markets.repository";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

export class UpdateMarketDisplayNameService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(id: string, data: UpdateMarketDisplayNameDTO) {
    const market = await this.marketsRepository.findById(id);

    if (!market) {
      throw new AppError("Market not found", 404);
    }

    const normalizedName = toTitleCase(data.displayName);

    const updatedMarket = await this.marketsRepository.updateDisplayName(
      id,
      normalizedName
    );

    return updatedMarket;
  }
}