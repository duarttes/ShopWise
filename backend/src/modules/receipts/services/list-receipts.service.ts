/**
 * ListReceiptsService
 *
 * Returns all receipts currently stored in the system.
 */

import { ReceiptsRepository } from "../repositories/receipts.repository";

export class ListReceiptsService {
  constructor(private receiptsRepository: ReceiptsRepository) {}

  async execute() {
    return this.receiptsRepository.findMany();
  }
}