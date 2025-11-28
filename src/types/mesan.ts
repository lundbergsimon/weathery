

export interface SMHIWeatherDataParameter {
  parameter: string;
  shortName: string;
  description: string;
  level: number;
  unit: string;
}

export interface SMHIDataParameter {
  air_pressure_at_mean_sea_level: number;
  air_temperature: number;
  change_over_time_in_surface_snow_amount_1_hours: number;
  change_over_time_in_surface_snow_amount_3_hours: number;
  change_over_time_in_surface_snow_amount_12_hours: number;
  change_over_time_in_surface_snow_amount_24_hours: number;
  cloud_are_fraction_significant: number;
  cloud_area_fraction: number;
  cloud_base_altitude: number;
  cloud_top_altitude: number;
  high_type_cloud_area_fraction: number;
  low_type_cloud_area_fraction: number;
  medium_type_cloud_area_fraction: number;
  precipitation_amount_last_1_hours: number;
  precipitation_amount_last_3_hours: number;
  precipitation_frozen_part: number;
  precipitation_rate_max: number;
  precipitation_rate_mean: number;
  precipitation_rate_median: number;
  precipitation_rate_min: number;
  precipitation_sort: number;
  predominant_precipitation_type_at_surface: number;
  relative_humidity: number;
  symbol_code: number;
  visibility_in_air: number;
  wet_bulb_temperature: number;
  wind_from_direction: number;
  wind_speed: number;
  wind_speed_of_gust: number;
}

export interface SMHIWeatherHour {
  time: string;
  data: SMHIDataParameter;
}

export interface SMHIGeometry {
  type: string;
  coordinates: number[];
}

export interface SMHIResponse {
  approvedTime: string;
  referenceTime: string;
  geometry: SMHIGeometry;
  timeSeries: SMHIWeatherHour[];
}