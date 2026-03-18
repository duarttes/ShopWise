/**
 * AddShoppingListItemService
 *
 * Handles the business logic for adding an item to a shopping list.
 *
 * Matching strategy in the MVP:
 * - if productId is provided, validate and use it
 * - otherwise, try to resolve a product automatically by item name
 *
 * This makes shopping list creation more natural for users while improving
 * recommendation coverage when a matching product is found.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { resolveProductByName } from "../../../shared/utils/resolve-product-by-name";
import { AddShoppingListItemDTO } from "../dtos/add-shopping-list-item.dto";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class AddShoppingListItemService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(shoppingListId: string, data: AddShoppingListItemDTO) {
    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    let resolvedProductId = data.productId;

    if (resolvedProductId) {
      const product = await prisma.product.findUnique({
        where: { id: resolvedProductId },
      });

      if (!product) {
        throw new AppError("Product not found", 404);
      }
    } else {
      const matchedProduct = await resolveProductByName(data.name);

      if (matchedProduct) {
        resolvedProductId = matchedProduct.id;
      }
    }

    return this.shoppingListsRepository.addItem(shoppingListId, {
      ...data,
      productId: resolvedProductId,
    });
  }
}