import 'reflect-metadata';
import "dotenv/config";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerSpec from "./swagger";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

app.use(errorHandler);

export default app;