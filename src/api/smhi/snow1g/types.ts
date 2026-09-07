export type Snow1gGeometry = {
  type: string;
  coordinates: number[];
};

export type Snow1gData = {
  air_temperature: number;
  wind_from_direction: number;
  wind_speed: number;
  wind_speed_of_gust: number;
  relative_humidity: number;
  air_pressure_at_mean_sea_level: number;
  visibility_in_air: number;
  thunderstorm_probability: number;
  probability_of_frozen_precipitation: number;
  cloud_area_fraction: number;
  low_type_cloud_area_fraction: number;
  medium_type_cloud_area_fraction: number;
  high_type_cloud_area_fraction: number;
  cloud_base_altitude: number;
  cloud_top_altitude: number;
  precipitation_amount_mean_deterministic: number;
  precipitation_amount_mean: number;
  precipitation_amount_min: number;
  precipitation_amount_max: number;
  precipitation_amount_median: number;
  probability_of_precipitation: number;
  precipitation_frozen_part: number;
  predominant_precipitation_type_at_surface: number;
  symbol_code: number;
};

export type Snow1gTimeSeriesEntry = {
  time: string;
  intervalParametersStartTime: string;
  data: Snow1gData;
};

export type Snow1gResponse = {
  createdTime: string;
  referenceTime: string;
  geometry: Snow1gGeometry;
  timeSeries: Snow1gTimeSeriesEntry[];
};
