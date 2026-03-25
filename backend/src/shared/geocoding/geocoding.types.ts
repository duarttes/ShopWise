/**
 * Geocoding provider shared types.
 */

export interface GeocodeAddressInput {
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

export interface GeocodeAddressResult {
  latitude: number;
  longitude: number;
  formattedAddress: string | null;
  provider: string;
}

export interface GeocodingProvider {
  geocode(input: GeocodeAddressInput): Promise<GeocodeAddressResult | null>;
}