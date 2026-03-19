/**
 * AddShoppingListItemService
 *
 * Handles the business logic for adding an item to a shopping list.
 *
 * Matching strategy in the MVP:
 * - if productId is provided, validate and use it
 * - otherwise, try to resolve a product automatically by item name
 *
 * Ownership rule:
 * only the owner of the shopping list can add items to it.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { ensureResourceOwner } from "../../../shared/utils/resource-ownership";
import { resolveProductByName } from "../../../shared/utils/resolve-product-by-name";
import { AddShoppingListItemDTO } from "../dtos/add-shopping-list-item.dto";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class AddShoppingListItemService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(
    shoppingListId: string,
    authenticatedUserId: string,
    data: AddShoppingListItemDTO
  ) {
    const shoppingList = await this.shoppingListsRepository.findById(shoppingListId);

    if (!shoppingList) {
      throw new AppError("Shopping list not found", 404);
    }

    ensureResourceOwner(authenticatedUserId, shoppingList.userId);

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