/**
 * Main route registry.
 *
 * All module routes should be composed here.
 */

import { Router } from "express";
import marketsRoutes from "./markets.routes";
import productsRoutes from "./products.routes";
import usersRoutes from "./users.routes";

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
  return response.status(200).json({
    status: "ok",
    service: "shopwise-backend",
  });
});

routes.use("/users", usersRoutes);
routes.use("/markets", marketsRoutes);
routes.use("/products", productsRoutes);

export default routes;