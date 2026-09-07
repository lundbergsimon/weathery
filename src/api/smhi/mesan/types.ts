import { WeatherParameter } from "@/types";

export type Snow1gWeatherParameterName =
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

export type Snow1gWeatherParameterUnit =
  | "Cel"
  | "degree"
  | "m/s"
  | "percent"
  | "hPa"
  | "octas"
  | "kg/m2/h"
  | "category"
  | "kg/m2";

export type WeatherParameterName = {
  name: Snow1gWeatherParameterName;
  unit: Snow1gWeatherParameterUnit;
  values: number[];
};

export type MesanTimeSeriesEntry = {
  time: string;
  parameters: WeatherParameter[];
};

export type MesanGeometry = {
  type: string;
  coordinates: number[];
};

export type MesanResponse = {
  approvedTime: string;
  referenceTime: string;
  geometry: MesanGeometry;
  timeSeries: MesanTimeSeriesEntry[];
};
