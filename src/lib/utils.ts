import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";
import { WeatherHour, WeatherParameter } from "@/types";

/**
 * Returns the first value of a WeatherParameter with the given name.
 *
 * If no parameter with the given name is found, or if the parameter has no values,
 * this function returns null.
 */
export const getParameterValue = (
  parameters: WeatherParameter[] | undefined,
  name: string
) => {
  if (!Array.isArray(parameters)) {
    console.warn("Invalid parameters array passed to getParameterValue");
    return null;
  }

  const param = parameters.find((p) => p.name === name);
  if (!param || param.values.length === 0) {
    console.warn(`No parameter with name "${name}" found`);
    return null;
  }
  return param.values[0];
};

export const getWeatherSymbol = (parameters: WeatherParameter[]) => {
  const symbolValue = getParameterValue(parameters, "Wsymb2");
  return symbolValue ? SMHI_WEATHER_SYMBOLS[symbolValue] : null;
}

/**
 * Returns an object with the minimum and maximum temperatures from an array of WeatherHour objects.
 *
 * If no valid temperatures are found, the function returns an object with both min and max set to null.
 */
export const getMinMaxTemperature = (hours: WeatherHour[]) => {
  let min: number | null = null;
  let max: number | null = null;
  hours.forEach((hour) => {
    const temp = getParameterValue(hour.parameters, "t");
    if (temp === null) return;
    if (min === null || temp < min) min = temp;
    if (max === null || temp > max) max = temp;
  });
  return { min, max };
};
