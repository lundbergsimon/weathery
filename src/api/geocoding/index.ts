import { NominatimService } from "./nominatim";
import { GeocodingService } from "./types";

export const geocodingService: GeocodingService = new NominatimService();
