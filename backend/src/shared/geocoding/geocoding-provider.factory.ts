/**
 * Geocoding provider factory.
 */

import { AppError } from "../errors/app-error";
import { NominatimGeocodingProvider } from "./providers/nominatim-geocoding.provider";
import { GeocodingProvider } from "./geocoding.types";

export function makeGeocodingProvider(): GeocodingProvider {
  const provider = (process.env.GEOCODING_PROVIDER || "nominatim").toLowerCase();

  if (provider === "nominatim") {
    return new NominatimGeocodingProvider();
  }

  throw new AppError(`Unsupported geocoding provider: ${provider}`, 500);
}