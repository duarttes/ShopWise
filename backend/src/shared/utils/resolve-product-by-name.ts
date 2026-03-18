/**
 * resolveProductByName
 *
 * Attempts to find a product using a normalized version of the provided name.
 *
 * Current MVP strategy:
 * - normalize the input name
 * - try an exact match against Product.normalizedName
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

  const product = await prisma.product.findUnique({
    where: {
      normalizedName,
    },
  });

  return product;
}