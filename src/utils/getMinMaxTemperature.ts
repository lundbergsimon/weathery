import { WeatherHour } from "@/types";
import { getParameterValue } from "./getParameterValue";

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
  return { minTemp: min, maxTemp: max };
};
