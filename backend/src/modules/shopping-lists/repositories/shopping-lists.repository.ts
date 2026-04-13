/**
 * ShoppingListsRepository
 *
 * Handles all database operations related to shopping lists and shopping list items.
 * This repository centralizes persistence and query behavior for the module.
 */

import { prisma } from "../../../shared/infra/prisma";
import { AddShoppingListItemDTO } from "../dtos/add-shopping-list-item.dto";
import { CreateShoppingListDTO } from "../dtos/create-shopping-list.dto";

export class ShoppingListsRepository {
  async create(data: CreateShoppingListDTO) {
    return prisma.shoppingList.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.shoppingList.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  }

  async findManyByUserId(userId: string) {
    return prisma.shoppingList.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async addItem(shoppingListId: string, data: AddShoppingListItemDTO) {
    return prisma.shoppingListItem.create({
      data: {
        shoppingListId,
        name: data.name,
        quantity: data.quantity,
        unit: data.unit,
        productId: data.productId,
      },
      include: {
        product: true,
      },
    });
  }

  async findItemById(itemId: string) {
    return prisma.shoppingListItem.findUnique({
      where: { id: itemId },
    });
  }

  async deleteItem(itemId: string) {
    return prisma.shoppingListItem.delete({
      where: { id: itemId },
    });
  }
}