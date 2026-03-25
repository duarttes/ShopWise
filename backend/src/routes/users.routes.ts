/**
 * Users routes.
 *
 * This file registers all HTTP endpoints related to users.
 * User registration is handled by the auth module.
 */

import { Router } from "express";
import { getCurrentUserController } from "../modules/users/controllers/get-current-user.controller";
import { getUserByIdController } from "../modules/users/controllers/get-user-by-id.controller";
import { listUsersController } from "../modules/users/controllers/list-users.controller";
import { updateRecommendationStrategyController } from "../modules/users/controllers/update-recommendation-strategy.controller";
import { ensureAuthenticated } from "../shared/middlewares/ensure-authenticated.middleware";

const usersRoutes = Router();

usersRoutes.get("/me", ensureAuthenticated, getCurrentUserController);
usersRoutes.patch(
  "/me/recommendation-strategy",
  ensureAuthenticated,
  updateRecommendationStrategyController
);

usersRoutes.get("/", listUsersController);
usersRoutes.get("/:id", getUserByIdController);

export default usersRoutes;