/**
 * GetReceiptByIdController
 *
 * Handles the HTTP request for retrieving a receipt by id.
 */

import { Request, Response } from "express";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { GetReceiptByIdService } from "../services/get-receipt-by-id.service";

type getReceiptByIdService = {
    id: string;
}

const receiptsRepository = new ReceiptsRepository();
const getReceiptByIdService = new GetReceiptByIdService(receiptsRepository);

export async function getReceiptByIdController(
  request: Request<getReceiptByIdService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const receipt = await getReceiptByIdService.execute(id, request.user!.id);
  
  return response.status(200).json(receipt);
}