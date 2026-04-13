/**
 * User recommendation strategy update validation schema.
 */

import { z } from "zod";

export const updateRecommendationStrategySchema = z.object({
  recommendationStrategy: z.enum(["balanced", "cheapest", "closest"]),
});

export type UpdateRecommendationStrategyInput = z.infer<
  typeof updateRecommendationStrategySchema
>;