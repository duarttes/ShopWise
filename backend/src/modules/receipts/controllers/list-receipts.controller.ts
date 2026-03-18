/**
 * ListReceiptsController
 *
 * Handles the HTTP request for listing all receipts.
 */

import { Request, Response } from "express";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { ListReceiptsService } from "../services/list-receipts.service";

export async function listReceiptsController(
  _request: Request,
  response: Response
): Promise<Response> {
  const receiptsRepository = new ReceiptsRepository();
  const listReceiptsService = new ListReceiptsService(receiptsRepository);

  const receipts = await listReceiptsService.execute();

  return response.status(200).json(receipts);
}