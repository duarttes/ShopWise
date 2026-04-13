/**
 * UpdateRecommendationStrategyService
 *
 * Updates the authenticated user's default recommendation strategy.
 */

import { AppError } from "../../../shared/errors/app-error";
import { UpdateRecommendationStrategyDTO } from "../dtos/update-recommendation-strategy.dto";
import { UsersRepository } from "../repositories/users.repository";

export class UpdateRecommendationStrategyService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string, data: UpdateRecommendationStrategyDTO) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return this.usersRepository.updateRecommendationStrategy(
      userId,
      data.recommendationStrategy
    );
  }
}