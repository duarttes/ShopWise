/**
 * CreateProductDTO
 *
 * Represents the input required to create a new product.
 * normalizedName is the canonical version used for comparisons.
 */
export interface CreateProductDTO {
  name: string;
  normalizedName: string;
  brand?: string;
  category?: string;
  unit?: string;
}