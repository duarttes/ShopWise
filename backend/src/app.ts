/**
 * Express application setup.
 *
 * Responsibilities:
 * - initialize Express
 * - register middlewares
 * - expose Swagger
 * - register application routes
 * - register the global error handler
 */

import "dotenv/config";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerSpec from "./swagger";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Swagger documentation endpoint.
 * Access it at /docs after the server starts.
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Application routes.
 */
app.use(routes);

/**
 * Global error handler must be registered after routes.
 */
app.use(errorHandler);

export default app;