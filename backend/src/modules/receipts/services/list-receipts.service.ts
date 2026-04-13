/**
 * ListReceiptsService
 *
 * Returns paginated receipts for the authenticated user only.
 */

import { buildPaginationMeta } from "../../../shared/utils/pagination";
import { ReceiptsRepository } from "../repositories/receipts.repository";

export class ListReceiptsService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute(userId: string, page: number, limit: number, skip: number) {
    const result = await this.receiptsRepository.findManyByUserId(
      userId,
      page,
      limit,
      skip
    );

    return {
      data: result.receipts,
      meta: buildPaginationMeta(result.total, result.page, result.limit),
    };
  }
}