/**
 * ListUserShoppingListsController
 *
 * Handles the HTTP request for listing all shopping lists from a specific user.
 */

import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { ListUserShoppingListsService } from "../services/list-user-shopping-lists.service";

type listUserShoppingListsService = {
  id: string;
}

const shoppingListsRepository = new ShoppingListsRepository();
const listUserShoppingListsService = new ListUserShoppingListsService(
  shoppingListsRepository
);

export async function listUserShoppingListsController(
  request: Request<listUserShoppingListsService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const shoppingLists = await listUserShoppingListsService.execute(id);

  return response.status(200).json(shoppingLists);
}