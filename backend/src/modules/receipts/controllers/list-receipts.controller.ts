/**
 * ListReceiptsController
 *
 * Handles the HTTP request for listing paginated receipts
 * belonging to the authenticated user.
 */

import { Request, Response } from "express";
import { parsePagination } from "../../../shared/utils/pagination";
import { ReceiptsRepository } from "../repositories/receipts.repository";
import { ListReceiptsService } from "../services/list-receipts.service";

export async function listReceiptsController(
  request: Request,
  response: Response
): Promise<Response> {
  const { page, limit, skip } = parsePagination(
    typeof request.query.page === "string" ? request.query.page : undefined,
    typeof request.query.limit === "string" ? request.query.limit : undefined
  );

  const receiptsRepository = new ReceiptsRepository();
  const listReceiptsService = new ListReceiptsService(receiptsRepository);

  const receipts = await listReceiptsService.execute(
    request.user!.id,
    page,
    limit,
    skip
  );

  return response.status(200).json(receipts);
}