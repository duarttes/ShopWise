/**
 * UpdateRecommendationStrategyDTO
 *
 * Represents the input required to update the user's default
 * recommendation strategy.
 */
export interface UpdateRecommendationStrategyDTO {
  recommendationStrategy: "balanced" | "cheapest" | "closest";
}