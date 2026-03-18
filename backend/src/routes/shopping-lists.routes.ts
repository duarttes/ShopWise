/**
 * Shopping lists routes.
 *
 * This file registers all HTTP endpoints related to shopping lists.
 */

import { Router } from "express";
import { addShoppingListItemController } from "../modules/shopping-lists/controllers/add-shopping-list-item.controller";
import { createShoppingListController } from "../modules/shopping-lists/controllers/create-shopping-list.controller";
import { getShoppingListByIdController } from "../modules/shopping-lists/controllers/get-shopping-list-by-id.controller";
import { listUserShoppingListsController } from "../modules/shopping-lists/controllers/list-user-shopping-lists.controller";
import { removeShoppingListItemController } from "../modules/shopping-lists/controllers/remove-shopping-list-item.controller";

const shoppingListsRoutes = Router();

shoppingListsRoutes.post("/", createShoppingListController);
shoppingListsRoutes.get("/:id", getShoppingListByIdController);
shoppingListsRoutes.post("/:id/items", addShoppingListItemController);
shoppingListsRoutes.delete("/:id/items/:itemId", removeShoppingListItemController);

/**
 * User-scoped shopping list route.
 * This route is exposed here to keep the shopping list module self-contained.
 */
shoppingListsRoutes.get("/users/:id/shopping-lists", listUserShoppingListsController);

export default shoppingListsRoutes;