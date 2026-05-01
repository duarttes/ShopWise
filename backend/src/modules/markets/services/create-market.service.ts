import { AppError } from "../../../shared/errors/app-error";
import { geocodeAddress } from "../../../shared/utils/geocoding";
import { CreateMarketDTO } from "../dtos/create-market.dto";
import { MarketsRepository } from "../repositories/markets.repository";

export class CreateMarketService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(data: CreateMarketDTO) {
    const existing = await this.marketsRepository.findByCnpj(data.cnpj ?? '');

    if (existing) {
      throw new AppError("Market with this CNPJ already exists", 409);
    }

    let latitude: number | undefined;
    let longitude: number | undefined;

    if (data.address && data.city && data.state) {
      const fullAddress = `${data.address}, ${data.city}, ${data.state}, Brasil`;
      const coords = await geocodeAddress(fullAddress);
      if (coords) {
        latitude = coords.latitude;
        longitude = coords.longitude;
      }
    }

    return this.marketsRepository.create({ ...data, latitude, longitude });
  }
}