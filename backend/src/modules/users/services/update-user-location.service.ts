/**
 * UpdateUserLocationService
 *
 * Updates the authenticated user's saved home coordinates.
 */

import { AppError } from "../../../shared/errors/app-error";
import { UpdateUserLocationDTO } from "../dtos/update-user-location.dto";
import { UsersRepository } from "../repositories/users.repository";

export class UpdateUserLocationService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string, data: UpdateUserLocationDTO) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.usersRepository.updateLocation(
      userId,
      data.homeLatitude,
      data.homeLongitude
    );
  }
}