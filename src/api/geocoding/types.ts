export interface Coordinates {
  lat: number;
  lon: number;
}

export interface GeocodingApiResponse {
  status: number;
  data: Coordinates | null;
}

export interface GeocodingService {
  getCoordinates(query: string): Promise<GeocodingApiResponse>;
}
