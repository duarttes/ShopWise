/**
 * CreateShoppingListService
 *
 * Handles the business logic for creating a shopping list.
 * The main business rule here is ensuring the user exists before creating the list.
 */

import { AppError } from "../../../shared/errors/app-error";
import { prisma } from "../../../shared/infra/prisma";
import { CreateShoppingListDTO } from "../dtos/create-shopping-list.dto";
import { ShoppingListsRepository } from "../repositories/shopping-lists.repository";

export class CreateShoppingListService {
  constructor(private shoppingListsRepository: ShoppingListsRepository) {}

  async execute(data: CreateShoppingListDTO) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.shoppingListsRepository.create(data);
  }
}