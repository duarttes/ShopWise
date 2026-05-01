import {
  Recommendation,
  RecommendationConfidence,
} from '../domain/recommendation';

interface SameItemBelowAverageInput {
  productId: string;
  currentPrice: number;
  averageUserPrice: number;
  samples: number;
  lastSeenAt?: string;
}

export class SameItemBelowAverageRule {
  execute(input: SameItemBelowAverageInput): Recommendation | null {
    if (
      !input.currentPrice ||
      !input.averageUserPrice ||
      input.averageUserPrice <= 0
    ) {
      return null;
    }

    const delta =
      (input.averageUserPrice - input.currentPrice) / input.averageUserPrice;

    if (delta < 0.08) {
      return null;
    }

    const percent = Math.round(delta * 100);
    const confidence = this.calculateConfidence(input.samples, input.lastSeenAt);

    return {
      type: 'buy_now',
      title: 'Bom momento para comprar',
      productId: input.productId,
      explanation: {
        reasonCodes: ['PRICE_BELOW_USER_AVERAGE'],
        summary: `Preço atual ${percent}% abaixo da sua média histórica.`,
        confidence,
        evidence: {
          currentPrice: input.currentPrice,
          averageUserPrice: input.averageUserPrice,
          samples: input.samples,
          lastSeenAt: input.lastSeenAt,
        },
      },
    };
  }

  private calculateConfidence(
    samples: number,
    lastSeenAt?: string,
  ): RecommendationConfidence {
    let score = 0;

    if (samples >= 5) score += 2;
    else if (samples >= 3) score += 1;

    if (lastSeenAt) {
      const now = new Date();
      const seenAt = new Date(lastSeenAt);

      if (!Number.isNaN(seenAt.getTime())) {
        const diffInDays = Math.floor(
          (now.getTime() - seenAt.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffInDays <= 7) score += 2;
        else if (diffInDays <= 30) score += 1;
      }
    }

    if (score >= 4) return 'high';
    if (score >= 2) return 'medium';
    return 'low';
  }
}