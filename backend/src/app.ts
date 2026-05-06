import 'reflect-metadata';
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import routes from "./routes";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.CORS_ORIGIN,
      'http://localhost:5173',
      'http://localhost:3000',
    ].filter(Boolean);

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(helmet());

app.use(
  "/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: "Too many requests, try again later.", issues: null },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(routes);
app.use(errorHandler);

export default app;