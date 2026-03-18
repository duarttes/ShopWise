/**
 * Main route registry.
 *
 * All module routes should be composed here.
 * For now, we expose a health check endpoint to validate the infrastructure.
 */

import { Router } from "express";

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

export default routes;