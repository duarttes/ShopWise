export type RecommendationType = 'buy_now' | 'switch_brand' | 'best_market';

export type RecommendationConfidence = 'low' | 'medium' | 'high';

export interface RecommendationExplanation {
  reasonCodes: string[];
  summary: string;
  confidence: RecommendationConfidence;
  evidence: {
    currentPrice?: number;
    averageUserPrice?: number;
    cheaperMarketCount?: number;
    samples?: number;
    lastSeenAt?: string;
  };
}

export interface Recommendation {
  type: RecommendationType;
  title: string;
  productId?: string;
  marketId?: string;
  explanation: RecommendationExplanation;
}