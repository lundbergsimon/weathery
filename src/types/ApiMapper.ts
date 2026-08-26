import { SMHIWeatherData } from ".";

export interface ApiMapper<T = unknown> {
  map(raw: T): SMHIWeatherData;
}
