import { WeatherParameter } from "@/types";
import { getParameterValue } from "./getParameterValue";
import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";

export const getWeatherSymbol = (parameters: WeatherParameter[]) => {
  const symbolValue = getParameterValue(parameters, "Wsymb2");
  return symbolValue ? SMHI_WEATHER_SYMBOLS[symbolValue] : null;
};
