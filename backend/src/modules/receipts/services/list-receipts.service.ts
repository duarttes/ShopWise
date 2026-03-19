/**
 * ListReceiptsService
 *
 * Returns paginated receipts currently stored in the system.
 */

import { buildPaginationMeta } from "../../../shared/utils/pagination";
import { ReceiptsRepository } from "../repositories/receipts.repository";

export class ListReceiptsService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute(page: number, limit: number, skip: number) {
    const result = await this.receiptsRepository.findMany(page, limit, skip);

    return {
      data: result.receipts,
      meta: buildPaginationMeta(result.total, result.page, result.limit),
    };
  }
}