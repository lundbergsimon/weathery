export interface Coordinates {
  lat: number;
  lon: number;
}

export interface GeocodingService {
  getCoordinates(query: string): Promise<Coordinates | null>;
}
