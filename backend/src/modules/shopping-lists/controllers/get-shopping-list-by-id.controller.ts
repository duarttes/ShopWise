/**
 * GetShoppingListByIdController
 *
 * Handles the HTTP request for retrieving a shopping list by id.
 * Only the owner of the shopping list can access it.
 */

import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { GetShoppingListByIdService } from "../services/get-shopping-list-by-id.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";

type getShoppingListByIdService = {
  id: string;
}

const shoppingListsRepository = new ShoppingListsRepository();
const getShoppingListByIdService = new GetShoppingListByIdService(
  shoppingListsRepository
);

export async function getShoppingListByIdController(
  request: Request<getShoppingListByIdService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

    const shoppingList = await getShoppingListByIdService.execute(
    id,
    request.user!.id
  );


  return response.status(200).json(
    buildSuccessResponse({
      message: "Shopping list retrieved successfully",
      data: shoppingList,
    })
  );
}