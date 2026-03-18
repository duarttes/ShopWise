/**
 * CreateMarketDTO
 *
 * Represents the input required to create a new market.
 * Most location-related fields are optional in the MVP.
 */
export interface CreateMarketDTO {
  name: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}