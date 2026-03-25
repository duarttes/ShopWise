/**
 * UpdateUserLocationController
 *
 * Handles the HTTP request for updating the authenticated user's
 * saved home coordinates.
 */

import { Request, Response } from "express";
import { buildSuccessResponse } from "../../../shared/utils/api-response";
import { updateUserLocationSchema } from "../schemas/update-user-location.schema";
import { UsersRepository } from "../repositories/users.repository";
import { UpdateUserLocationService } from "../services/update-user-location.service";

export async function updateUserLocationController(
  request: Request,
  response: Response
): Promise<Response> {
  const data = updateUserLocationSchema.parse(request.body);

  const usersRepository = new UsersRepository();
  const updateUserLocationService = new UpdateUserLocationService(
    usersRepository
  );

  const user = await updateUserLocationService.execute(request.user!.id, data);

  return response.status(200).json(
    buildSuccessResponse({
      message: "User location updated successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        recommendationStrategy: user.recommendationStrategy ?? "balanced",
        homeLatitude: user.homeLatitude,
        homeLongitude: user.homeLongitude,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  );
}