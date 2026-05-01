import { GeocodeAddressInput, GeocodeAddressResult, GeocodingProvider } from "../geocoding.types";

interface NominatimSearchResult {
  lat: string;
  lon: string;
  display_name?: string;
}

export class NominatimGeocodingProvider implements GeocodingProvider {
  async geocode(input: GeocodeAddressInput): Promise<GeocodeAddressResult | null> {
    const rawAddress = input.address?.trim() ?? '';

    const cleanAddress = rawAddress
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s, i, arr) => arr.indexOf(s) === i)
      .slice(0, 2)
      .join(', ');

    const parts = [
      cleanAddress || null,
      input.city?.trim(),
      input.state?.trim(),
      input.country?.trim() ?? 'Brazil',
    ].filter(Boolean);

    if (parts.length === 0) {
      return null;
    }

    const query = parts.join(', ');
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', query);
    url.searchParams.set('format', 'jsonv2');
    url.searchParams.set('limit', '1');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('countrycodes', 'br');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'User-Agent':
          process.env.GEOCODING_USER_AGENT ||
          'ShopWise/1.0 (contact: unknown@example.com)',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as NominatimSearchResult[];

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const first = data[0];
    const latitude = Number(first.lat);
    const longitude = Number(first.lon);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return null;
    }

    return {
      latitude,
      longitude,
      formattedAddress: first.display_name ?? null,
      provider: 'nominatim',
    };
  }
}