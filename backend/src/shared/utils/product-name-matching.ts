/**
 * Product name matching helpers.
 *
 * Centralizes token-based heuristics used to improve automatic product resolution.
 */

export function tokenizeNormalizedName(value: string): string[] {
  return value
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);
}

export function calculateTokenOverlapScore(
  source: string,
  candidate: string
): number {
  const sourceTokens = new Set(tokenizeNormalizedName(source));
  const candidateTokens = new Set(tokenizeNormalizedName(candidate));

  if (sourceTokens.size === 0 || candidateTokens.size === 0) {
    return 0;
  }

  let overlap = 0;

  for (const token of candidateTokens) {
    if (sourceTokens.has(token)) {
      overlap += 1;
    }
  }

  return overlap / candidateTokens.size;
}