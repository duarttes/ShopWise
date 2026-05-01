export interface GeocodingResult {
  latitude: number;
  longitude: number;
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    const query = encodeURIComponent(address);
    const userAgent = process.env.GEOCODING_USER_AGENT ?? 'ShopWise/1.0';

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      { headers: { 'User-Agent': userAgent } }
    );

    if (!response.ok) return null;

    const data = await response.json() as any[];

    if (!data.length) return null;

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}