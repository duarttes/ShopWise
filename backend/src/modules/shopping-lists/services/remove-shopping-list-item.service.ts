/**
 * RemoveShoppingListItemService
 *
 * Handles the business logic for removing an item from a shopping list.
 * Only the owner of the shopping list can remove items from it.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ensureResourceOwner } from "../../../shared/utils/resource-ownership";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class RemoveShoppingListItemService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(
    shoppingListId: string,
    authenticatedUserId: string,
    itemId: string
  ) {
    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    ensureResourceOwner(authenticatedUserId, shoppingList.userId);

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