/**
 * GetShoppingListByIdService
 *
 * Retrieves a single shopping list by its unique identifier
 * and validates ownership against the authenticated user.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ensureResourceOwner } from "../../../shared/utils/resource-ownership";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class GetShoppingListByIdService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(id: string, authenticatedUserId: string) {
    const shoppingList = await this.shoppingListsRepository.findById(id);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    ensureResourceOwner(authenticatedUserId, shoppingList.userId);

    return shoppingList;
  }
}