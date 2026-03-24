/**
 * resolveProductByName
 *
 * Attempts to find a product using a normalized version of the provided name.
 *
 * Current strategy:
 * 1. exact match against Product.normalizedName
 * 2. fallback to partial contains match
 *
 * Future improvements may include:
 * - fuzzy search
 * - synonym handling
 * - category-aware matching
 * - brand-aware matching
 */

import { prisma } from "../infra/prisma";
import { normalizeProductName } from "./normalize-product-name";

export async function resolveProductByName(name: string) {
  const normalizedName = normalizeProductName(name);

  const exactMatch = await prisma.product.findUnique({
    where: {
      normalizedName,
    },
  });

  if (exactMatch) {
    return exactMatch;
  }

  /**
   * Fallback:
   * try to find a product whose normalized name is contained in the item name
   * or vice-versa.
   */
  const partialMatches = await prisma.product.findMany({
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
    take: 5,
  });

  if (partialMatches.length > 0) {
    return partialMatches[0];
  }

  const allProducts = await prisma.product.findMany({
    take: 100,
  });

  const reverseMatch = allProducts.find((product) =>
    normalizedName.includes(product.normalizedName)
  );

  return reverseMatch ?? null;
}