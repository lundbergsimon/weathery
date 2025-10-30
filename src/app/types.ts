/* -------------------------------------------------------------------------- */
/*                                  SMHI API                                  */
/* -------------------------------------------------------------------------- */

import WeatherHourCard from "@/components/ui/WeatherHourCard";

export const WEATHER_PARAMETERS = {
  t: "Temperature",
  ws: "Wind Speed",
  r: "Relative Humidity",
  msl: "Air Pressure",
  Wsymb2: "Weather Symbol",
  vis: "Visibility",
} as const;

export interface WeatherParameter {
  name: string;
  unit: string;
  values: number[];
}

export interface WeatherHour {
  validTime: string;
  parameters: WeatherParameter[];
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface SMHIWeatherData {
  approvedTime: string;
  referenceTime: string;
  geometry: Geometry;
  timeSeries: WeatherHour[];
}

/* -------------------------------------------------------------------------- */
/*                                  Formatted                                 */
/* -------------------------------------------------------------------------- */

export interface WeatherDay {
  date: string;
  timeSeries: WeatherHour[];
}

export interface WeatherWeek {
  weekStartDate: string;
  days: WeatherDay[];
}

/* -------------------------------------------------------------------------- */
/*                                    Other                                   */
/* -------------------------------------------------------------------------- */

export interface ExpandedDay {
  weekStartDate: string;
  date: string;
}