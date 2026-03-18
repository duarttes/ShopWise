/**
 * GetShoppingListByIdService
 *
 * Retrieves a single shopping list by its unique identifier.
 */

import { AppError } from "../../../shared/errors/app-error";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class GetShoppingListByIdService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(id: string) {
    const shoppingList = await this.shoppingListsRepository.findById(id);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    return shoppingList;
  }
}