/**
 * GeocodeMarketService
 *
 * Tries to geocode a market using its address data.
 */

import { AppError } from "../../../shared/errors/app-error";
import { makeGeocodingProvider } from "../../../shared/geocoding/geocoding-provider.factory";
import { MarketsRepository } from "../repositories/markets.repository";

export class GeocodeMarketService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(marketId: string) {
    const market = await this.marketsRepository.findById(marketId);

    if (!market) {
      throw new AppError("Market not found", 404);
    }

    const provider = makeGeocodingProvider();

    const result = await provider.geocode({
      address: market.address,
      city: market.city,
      state: market.state,
      country: "Brazil",
    });

    if (!result) {
      throw new AppError("Could not geocode market address", 422);
    }

    const updatedMarket = await this.marketsRepository.updateCoordinates(
      marketId,
      result.latitude,
      result.longitude
    );

    return {
      market: updatedMarket,
      geocoding: {
        provider: result.provider,
        formattedAddress: result.formattedAddress,
      },
    };
  }
}