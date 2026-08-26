import {
  Geometry,
  SMHIWeatherData,
  WeatherHour,
  WeatherParameter,
  WeatherParameterName,
  WeatherParameterUnit,
} from "..";
import { ApiMapper } from "../ApiMapper";
import { ParameterMappingNotFoundError } from "../errors";

type Snow1gData = {
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
  symbol_code: 1;
};

type Snow1gTimeSeriesEntry = {
  time: string;
  intervalParametersStartTime: string;
  data: Snow1gData;
};

type Snow1gResponse = {
  createdTime: string;
  referenceTime: string;
  geometry: Geometry;
  timeSeries: Snow1gTimeSeriesEntry[];
};

export class Snow1gMapper implements ApiMapper {
  map(raw: Snow1gResponse): SMHIWeatherData {
    return {
      approvedTime: raw.createdTime,
      referenceTime: raw.referenceTime,
      geometry: raw.geometry,
      timeSeries: this.getTimeSeries(raw.timeSeries),
    };
  }

  private getTimeSeries(timeSeries: Snow1gTimeSeriesEntry[]): WeatherHour[] {
    return timeSeries.map((entry: Snow1gTimeSeriesEntry) => ({
      time: entry.time,
      parameters: this.mapParameters(entry.data),
    }));
  }

  private mapParameters(data: Snow1gData): WeatherParameter[] {
    const paramArray: WeatherParameter[] = [];
    for (const [key, value] of Object.entries(data)) {
      try {
        paramArray.push({
          name: this.mapParamName(key),
          unit: this.mapParamUnit(key),
          values: [value],
        });
      } catch (err) {
        if (err instanceof ParameterMappingNotFoundError) {
          continue;
        }
      }
    }
    return paramArray;
  }

  private mapParamName(name: string): WeatherParameterName {
    switch (name) {
      case "air_temperature":
        return "t";
      case "wind_from_direction":
        return "wd";
      case "wind_speed":
        return "ws";
      case "wind_speed_of_gust":
        return "gust";
      case "relative_humidity":
        return "r";
      case "air_pressure_at_mean_sea_level":
        return "msl";
      case "visibility_in_air":
        return "vis";
      case "precipitation_amount_mean":
        return "pmean";
      case "precipitation_amount_min":
        return "pmin";
      case "precipitation_amount_max":
        return "pmax";
      case "precipitation_amount_median":
        return "pmedian";
      case "symbol_code":
        return "Wsymb2";
      default:
        throw new ParameterMappingNotFoundError();
    }
  }

  private mapParamUnit(name: string): WeatherParameterUnit {
    switch (name) {
      case "air_temperature":
        return "Cel";
      case "wind_from_direction":
        return "degree";
      case "wind_speed":
      case "wind_speed_of_gust":
        return "m/s";
      case "relative_humidity":
      case "thunderstorm_probability":
      case "probability_of_frozen_precipitation":
      case "probability_of_precipitation":
      case "precipitation_frozen_part":
      case "cloud_area_fraction":
      case "low_type_cloud_area_fraction":
      case "medium_type_cloud_area_fraction":
      case "high_type_cloud_area_fraction":
        return "percent";
      case "air_pressure_at_mean_sea_level":
        return "hPa";
      case "visibility_in_air":
        return "percent";
      case "cloud_base_altitude":
      // case "cloud_top_altitude":
      //   return "m";
      case "precipitation_amount_mean_deterministic":
      case "precipitation_amount_mean":
      case "precipitation_amount_min":
      case "precipitation_amount_max":
      case "precipitation_amount_median":
        return "kg/m2";
      case "predominant_precipitation_type_at_surface":
        return "category";
      case "symbol_code":
        return "category";
      default:
        throw new Error(`Unknown weather parameter unit: ${name}`);
    }
  }
}
