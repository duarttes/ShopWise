/**
 * resolveProductByName
 *
 * Attempts to find a product using a normalized version of the provided name.
 *
 * Matching strategy:
 * 1. exact match against Product.normalizedName
 * 2. direct partial contains match
 * 3. reverse inclusion match
 * 4. token overlap scoring among candidates
 *
 * Future improvements may include:
 * - fuzzy matching
 * - synonym handling
 * - category-aware matching
 * - brand-aware matching
 */

import { prisma } from "../infra/prisma";
import { normalizeProductName } from "./normalize-product-name";
import { calculateTokenOverlapScore } from "./product-name-matching";

export async function resolveProductByName(name: string) {
  const normalizedName = normalizeProductName(name);

  if (!normalizedName) {
    return null;
  }

  /**
   * 1. Exact match
   */
  const exactMatch = await prisma.product.findUnique({
    where: {
      normalizedName,
    },
  });

  if (exactMatch) {
    return exactMatch;
  }

  /**
   * 2. Contains match
   */
  const directCandidates = await prisma.product.findMany({
    where: {
      OR: [
        {
          normalizedName: {
            contains: normalizedName,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
  });

  if (directCandidates.length === 1) {
    return directCandidates[0];
  }

  /**
   * 3. Reverse inclusion match
   */
  const broadCandidates = await prisma.product.findMany({
    take: 200,
  });

  const reverseCandidates = broadCandidates.filter((product) =>
    normalizedName.includes(product.normalizedName)
  );

  if (reverseCandidates.length === 1) {
    return reverseCandidates[0];
  }

  /**
   * 4. Token overlap scoring
   */
  const candidates = [...directCandidates, ...reverseCandidates];

  const uniqueCandidates = Array.from(
    new Map(candidates.map((candidate) => [candidate.id, candidate])).values()
  );

  if (uniqueCandidates.length === 0) {
    return null;
  }

  const scoredCandidates = uniqueCandidates
    .map((candidate) => ({
      candidate,
      score: calculateTokenOverlapScore(normalizedName, candidate.normalizedName),
    }))
    .filter((entry) => entry.score >= 0.5)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.candidate.normalizedName.length - a.candidate.normalizedName.length;
    });

  return scoredCandidates[0]?.candidate ?? null;
}