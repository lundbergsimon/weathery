import { SMHIWeatherData, WeatherWeek } from "@/types";
import { groupByWeekAndDay } from "@/utils/helpers";

const BASE_URL =
  "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point";

/**
 * Fetches weather data from the SMHI API for a given latitude and longitude.
 *
 * @param {number} longitude - The longitude of the location.
 * @param {number} latitude - The latitude of the location.
 * @returns {Promise<WeatherWeek[]>} - A promise that resolves with an array of WeatherWeek objects.
 */
export default async function getWeather(
  longitude: number,
  latitude: number
): Promise<WeatherWeek[]> {
  const lon = longitude.toFixed(2);
  const lat = latitude.toFixed(2);
  const endpoint = `${BASE_URL}/lon/${lon}/lat/${lat}/data.json`;

  const res = await fetch(endpoint, { cache: "default" });

  if (!res.ok) {
    throw new Error("SMHI API request failed");
  }

  const data: SMHIWeatherData = await res.json();

  const values = groupByWeekAndDay(data.timeSeries);

  return values;
}
