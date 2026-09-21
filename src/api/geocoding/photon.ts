import { GeocodingApiResponse, GeocodingService } from "./types";

interface PhotonFeature {
  type: string;
  properties: {
    [key: string]: string | number;
  };
  geometry: {
    type: string;
    coordinates: string[];
  };
}

interface PhotonResponse {
  type: string;
  features: PhotonFeature[];
}

export class PhotonService implements GeocodingService {
  private readonly baseUrl =
    "https://photon.komoot.io/api?countrycode=SE&lang=en";

  async getCoordinates(query: string): Promise<GeocodingApiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}&q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        return {
          status: response.status,
          data: null,
        };
      }

      const data = (await response.json()) as PhotonResponse;

      return {
        status: 200,
        data: {
          lat: 1,
          lon: 1,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        data: null,
      };
    }
  }
}
