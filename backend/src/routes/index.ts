/**
 * Main route registry.
 *
 * All module routes should be composed here.
 */

import { Router } from "express";
import analyticsRoutes from "./analytics.routes";
import authRoutes from "./auth.routes";
import marketsRoutes from "./markets.routes";
import productsRoutes from "./products.routes";
import receiptsRoutes from "./receipts.routes";
import recommendationsRoutes from "./recommendations.routes";
import shoppingListsRoutes from "./shopping-lists.routes";
import usersRoutes from "./users.routes";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";
import { buildSuccessResponse } from "../shared/utils/api-response";

const routes = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API is healthy
 */
routes.get("/health", (_request, response) => {
  return response.status(200).json(
    buildSuccessResponse({
      message: "API is healthy",
      data: {
        status: "ok",
        service: "shopwise-backend",
      },
    })
  );
});

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);
routes.use("/markets", marketsRoutes);
routes.use("/products", productsRoutes);
routes.use("/receipts", receiptsRoutes);
routes.use("/shopping-lists", shoppingListsRoutes);
routes.use("/analytics", analyticsRoutes);
routes.use(recommendationsRoutes);

/**
 * User-scoped shopping lists endpoint.
 * This mount keeps compatibility with the desired REST path.
 */
routes.get(
  "/users/:id/shopping-lists",
  ensureAuthenticated,
  (request, response, next) => {
    request.url = `/users/${request.params.id}/shopping-lists`;
    return shoppingListsRoutes(request, response, next);
  }
);

export default routes;