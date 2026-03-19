/**
 * Users routes.
 *
 * This file registers all HTTP endpoints related to users.
 * User registration is handled by the auth module.
 */

import { Router } from "express";
import { getUserByIdController } from "../modules/users/controllers/get-user-by-id.controller";
import { listUsersController } from "../modules/users/controllers/list-users.controller";

const usersRoutes = Router();

usersRoutes.get("/", listUsersController);
usersRoutes.get("/:id", getUserByIdController);

export default usersRoutes;