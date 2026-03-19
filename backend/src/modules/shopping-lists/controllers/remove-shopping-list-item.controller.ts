/**
 * RemoveShoppingListItemController
 *
 * Handles the HTTP request for removing an item from a shopping list.
 */

import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { RemoveShoppingListItemService } from "../services/remove-shopping-list-item.service";

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
  
  return response.status(200).json({ message: "Item removed successfully" });

}