/**
 * AddShoppingListItemService
 *
 * Handles the business logic for adding an item to a shopping list.
 * If a productId is provided, the service verifies that the product exists.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { AddShoppingListItemDTO } from "../dtos/add-shopping-list-item.dto";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class AddShoppingListItemService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(shoppingListId: string, data: AddShoppingListItemDTO) {
    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    if (data.productId) {
      const product = await prisma.product.findUnique({
        where: { id: data.productId },
      });

      if (!product) {
        throw new AppError("Product not found", 404);
      }
    }

    return this.shoppingListsRepository.addItem(shoppingListId, data);
  }
}