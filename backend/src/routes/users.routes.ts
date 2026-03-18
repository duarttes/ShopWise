/**
 * Users routes.
 *
 * This file registers all HTTP endpoints related to users.
 */

import { Router } from "express";
import { createUserController } from "../modules/users/controllers/create-user.controller";
import { getUserByIdController } from "../modules/users/controllers/get-user-by-id.controller";
import { listUsersController } from "../modules/users/controllers/list-users.controller";

const usersRoutes = Router();

usersRoutes.post("/", createUserController);
usersRoutes.get("/", listUsersController);
usersRoutes.get("/:id", getUserByIdController);

export default usersRoutes;