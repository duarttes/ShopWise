/**
 * AddShoppingListItemController
 *
 * Handles the HTTP request for adding a new item to a shopping list.
 * Only the owner of the shopping list can add items to it.
 */


import { Request, Response } from "express";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";
import { addShoppingListItemSchema } from "../schemas/shopping-list.schema";
import { AddShoppingListItemService } from "../services/add-shopping-list-item.service";
import { buildSuccessResponse } from "../../../shared/utils/api-response";


type addShoppingListItemService = {
  id: string;
}

const shoppingListsRepository = new ShoppingListsRepository();
const addShoppingListItemService = new AddShoppingListItemService(
  shoppingListsRepository
);


export async function addShoppingListItemController(
  request: Request<addShoppingListItemService>,
  response: Response
): Promise<Response> {
  const { id } = request.params;

  const data = addShoppingListItemSchema.parse(request.body);

    const item = await addShoppingListItemService.execute(
    id,
    request.user!.id,
    data
  );

  return response.status(201).json(
    buildSuccessResponse({
      message: "Shopping list item created successfully",
      data: item,
    })
  );
}