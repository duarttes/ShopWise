/**
 * RemoveShoppingListItemController
 *
 * Handles the HTTP request for removing an item from a shopping list.
 * Only the owner of the shopping list can remove items from it.
 */

import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { RemoveShoppingListItemService } from "../services/remove-shopping-list-item.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";

type removeShoppingListItemService = {
  id: string;
  itemId: string;
}

const shoppingListsRepository = new ShoppingListsRepository();
const removeShoppingListItemService = new RemoveShoppingListItemService(
  shoppingListsRepository
);

export async function removeShoppingListItemController(
  request: Request<removeShoppingListItemService>,
  response: Response
): Promise<Response> {
  const { id, itemId } = request.params;

  await removeShoppingListItemService.execute(id, request.user!.id, itemId);
  
  return response.status(200).json(
    buildSuccessResponse({
      message: "Shopping list item deleted successfully",
      data: null,
    })

  );
}