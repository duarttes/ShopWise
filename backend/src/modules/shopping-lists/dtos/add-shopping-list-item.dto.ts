/**
 * AddShoppingListItemDTO
 *
 * Represents the input required to add an item to a shopping list.
 * productId is optional in the MVP to keep list creation flexible.
 */
export interface AddShoppingListItemDTO {
  name: string;
  quantity?: number;
  unit?: string;
  productId?: string;
}