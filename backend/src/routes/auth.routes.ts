/**
 * Auth routes.
 *
 * Registers authentication-related endpoints.
 */

import { Router } from "express";
import { loginController } from "../modules/auth/controllers/login.controller";
import { registerController } from "../modules/auth/controllers/register.controller";
import { requestPasswordResetController } from "../modules/auth/controllers/request-password-reset.controller";
import { resetPasswordController } from "../modules/auth/controllers/reset-password.controller";


const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/forgot-password", requestPasswordResetController);
authRoutes.post("/reset-password", resetPasswordController);

export default authRoutes;