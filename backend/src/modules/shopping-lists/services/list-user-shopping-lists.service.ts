/**
 * ListUserShoppingListsService
 *
 * Returns all shopping lists created by a specific user.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class ListUserShoppingListsService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.shoppingListsRepository.findManyByUserId(userId);
  }
}