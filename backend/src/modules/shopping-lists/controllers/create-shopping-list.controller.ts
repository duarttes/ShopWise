/**
 * CreateShoppingListController
 *
 * Handles the HTTP request for creating a new shopping list.
 *
 * Ownership rule:
 * the authenticated user can only create shopping lists for themselves.
 */

import { Request, Response } from "express";
import { ensureSameUser } from "../../../shared/utils/authorization";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { createShoppingListSchema } from "../schemas/shopping-list.schema";
import { CreateShoppingListService } from "../services/create-shopping-list.service";

export async function createShoppingListController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = createShoppingListSchema.parse(request.body);

  ensureSameUser(request.user!.id, data.userId);

  const shoppingListsRepository = new ShoppingListsRepository();
  const createShoppingListService = new CreateShoppingListService(
    shoppingListsRepository
  );

  const shoppingList = await createShoppingListService.execute(data);

  return response.status(201).json(shoppingList);
}