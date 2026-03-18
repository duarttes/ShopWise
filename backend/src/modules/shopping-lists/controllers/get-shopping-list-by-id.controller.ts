/**
 * GetShoppingListByIdController
 *
 * Handles the HTTP request for retrieving a shopping list by id.
 */

import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { GetShoppingListByIdService } from "../services/get-shopping-list-by-id.service";


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

  const shoppingList = await getShoppingListByIdService.execute(id);

  return response.status(200).json(shoppingList);
}