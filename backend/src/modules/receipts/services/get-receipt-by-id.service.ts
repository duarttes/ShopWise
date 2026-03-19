/**
 * GetReceiptByIdService
 *
 * Retrieves a single receipt by its unique identifier.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { ensureResourceOwner } from "../../../shared/utils/resource-ownership";


export class GetReceiptByIdService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute(id: string, authenticatedUserId: string) {
    const receipt = await this.receiptsRepository.findById(id);

    if (!receipt) {
      throw new AppError("Receipt not found", 404);
    }

    ensureResourceOwner(authenticatedUserId, receipt.userId);

    return receipt;
  }
}