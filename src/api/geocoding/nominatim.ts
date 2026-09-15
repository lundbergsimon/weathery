import { GeocodingService, Coordinates } from "./types";

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export class NominatimService implements GeocodingService {
  private readonly baseUrl = "https://nominatim.openstreetmap.org/search";

  async getCoordinates(query: string): Promise<Coordinates | null> {
    const url = new URL(this.baseUrl);
    url.searchParams.append("q", query);
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", "1");

    try {
      const response = await fetch(url.toString(), {
        headers: {
          "User-Agent": "WeatheryApp",
        },
        next: { revalidate: 3600 * 24 }, // Cache results for 24 hours
      });

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as NominatimResponse[];

      if (!data || data.length === 0) {
        return null;
      }

      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
      };
    } catch (error) {
      console.error("Nominatim geocoding error:", error);
      return null;
    }
  }
}
