/**
 * ListMarketsService
 *
 * Returns all markets currently stored in the system.
 */

import { Market } from "../../../../generated/prisma/client";
import { MarketsRepository } from "../repositories/markets.repository";

export class ListMarketsService {
  constructor(private marketsRepository: MarketsRepository) {}

  async execute(city?: string): Promise<Market[]> {
    return this.marketsRepository.findMany(city);
  }
}