/**
 * RemoveShoppingListItemService
 *
 * Handles the business logic for removing an item from a shopping list.
 * The service validates both the shopping list and the target item.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class RemoveShoppingListItemService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(shoppingListId: string, itemId: string) {
    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    const item = await this.shoppingListsRepository.findItemById(itemId);

    if (!item) {
      throw new AppError("Shopping list item not found", 404);
    }

    if (item.shoppingListId !== shoppingListId) {
      throw new AppError("Item does not belong to the provided shopping list", 400);
    }

    await this.shoppingListsRepository.deleteItem(itemId);
  }
}