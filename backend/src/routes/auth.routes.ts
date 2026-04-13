/**
 * Auth routes.
 *
 * Registers authentication-related endpoints.
 */

import { Router } from "express";
import { loginController } from "../modules/auth/controllers/login.controller";
import { registerController } from "../modules/auth/controllers/register.controller";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

export default authRoutes;