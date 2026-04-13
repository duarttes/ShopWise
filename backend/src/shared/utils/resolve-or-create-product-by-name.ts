/**
 * resolveOrCreateProductByName
 *
 * Attempts to resolve a product by name.
 * If no existing product is found, creates a new product automatically.
 *
 * This helps ShopWise build its catalog from real receipt data.
 */

import { prisma } from "../infra/prisma";
import { extractBrandFromProductName } from "./extract-brand-from-product-name";
import { normalizeProductName } from "./normalize-product-name";
import { resolveProductByName } from "./resolve-product-by-name";

interface ResolveOrCreateProductByNameParams {
  rawName: string;
  unit?: string | null;
}

export async function resolveOrCreateProductByName({
  rawName,
  unit,
}: ResolveOrCreateProductByNameParams) {
  const existingProduct = await resolveProductByName(rawName);

  if (existingProduct) {
    return {
      product: existingProduct,
      created: false,
      matchedBy: "existing_product",
    };
  }

  const normalizedName = normalizeProductName(rawName);

  /**
   * Safety fallback:
   * if normalization returns an empty string, keep a minimally safe version.
   */
  const safeNormalizedName =
    normalizedName ||
    rawName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const inferredBrand = extractBrandFromProductName(rawName);

  const createdProduct = await prisma.product.create({
    data: {
      name: rawName.trim(),
      normalizedName: safeNormalizedName,
      unit: unit ?? undefined,
      category: null,
      brand: inferredBrand,
    },
  });

  return {
    product: createdProduct,
    created: true,
    matchedBy: "auto_created",
  };
}