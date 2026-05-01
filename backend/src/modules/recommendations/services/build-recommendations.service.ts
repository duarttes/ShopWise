import { injectable } from 'tsyringe';

import { Recommendation } from '../domain/recommendation';
import { SameItemBelowAverageRule } from '../rules/same-item-below-average.rule';

interface RecommendationCandidate {
  productId: string;
  currentPrice: number;
  averageUserPrice: number;
  samples: number;
  lastSeenAt?: string;
}

@injectable()
export class BuildRecommendationsService {
  private readonly sameItemBelowAverageRule = new SameItemBelowAverageRule();

  async execute(
    candidates: RecommendationCandidate[],
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    for (const candidate of candidates) {
      const sameItemRecommendation =
        this.sameItemBelowAverageRule.execute(candidate);

      if (sameItemRecommendation) {
        recommendations.push(sameItemRecommendation);
      }
    }

    return recommendations;
  }
}