/* -------------------------------------------------------------------------- */
/*                                  SMHI API                                  */
/* -------------------------------------------------------------------------- */
export type WeatherParameterName =
  | "t"
  | "wd"
  | "ws"
  | "gust"
  | "r"
  | "msl"
  | "vis"
  | "tstm"
  | "tcc_mean"
  | "lcc_mean"
  | "mcc_mean"
  | "hcc_mean"
  | "pmean"
  | "pmin"
  | "pmax"
  | "pmedian"
  | "spp"
  | "pcat"
  | "Wsymb2"
  | "tp";

export type WeatherParameterUnit =
  | "Cel"
  | "degree"
  | "m/s"
  | "percent"
  | "hPa"
  | "octas"
  | "kg/m2/h"
  | "category"
  | "kg/m2";

export const WeatherParametersFullNames: Record<WeatherParameterName, string> =
  {
    t: "Temperature",
    wd: "Wind direction",
    ws: "Wind speed",
    gust: "Wind gust",
    r: "Relative humidity",
    msl: "Sea level pressure",
    vis: "Visibility",
    tstm: "Thunderstorm",
    tcc_mean: "Cloud cover",
    lcc_mean: "Low cloud cover",
    mcc_mean: "Medium cloud cover",
    hcc_mean: "High cloud cover",
    pmean: "Mean precipitation",
    pmin: "Minimum precipitation",
    pmax: "Maximum precipitation",
    pmedian: "Median precipitation",
    spp: "Snow precipitation",
    pcat: "Precipitation category",
    Wsymb2: "Weather symbol",
    tp: "Total precipitation",
  };

export interface WeatherParameter {
  name: WeatherParameterName;
  unit: WeatherParameterUnit;
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
  hours: WeatherHour[];
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
