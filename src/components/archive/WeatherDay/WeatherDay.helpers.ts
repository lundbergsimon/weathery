import { WeatherHour } from "@/app/types";

/**
 * Calculates the average temperature from an array of WeatherHour objects.
 *
 * @param {WeatherHour[]} timeSeries - An array of WeatherHour objects.
 * @returns {number} The average temperature.
 */
export const getAverageTemperature = (timeSeries: WeatherHour[]): number =>
  timeSeries.reduce(
    (acc, hour) =>
      acc + hour.parameters.find((param) => param.name === "t")!.values[0],
    0
  ) / timeSeries.length;

/**
 * Returns the weekday of a given date in a given language.
 *
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @example
 * getWeekDay("2022-07-04", "en-US") // "Mon"
 */
export const getWeekDay = (date: string, language = "en-US"): string =>
  new Date(date).toLocaleDateString(language, {
    weekday: "short",
  });

/**
 * Returns the day and month of a given date in a given language.
 *
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @param {string} [language="en-US"] - The language to use for the date.
 * @returns {string} The day and month of the date.
 */
export const getDayAndMonth = (
  date: string,
  language: string = "en-US"
): string =>
  new Date(date).toLocaleDateString(language, {
    month: "short",
    day: "numeric",
  });

/**
 * Calculates the lowest temperature from an array of WeatherHour objects.
 *
 * @param {WeatherHour[]} timeSeries - An array of WeatherHour objects.
 * @returns {number} The lowest temperature.
 */

export const getLowestTemperature = (timeSeries: WeatherHour[]): number =>
  timeSeries.reduce(
    (acc, hour) =>
      acc < hour.parameters.find((param) => param.name === "t")!.values[0]
        ? acc
        : hour.parameters.find((param) => param.name === "t")!.values[0],
    Infinity
  );

/**
 * Calculates the highest temperature from an array of WeatherHour objects.
 *
 * @param {WeatherHour[]} timeSeries - An array of WeatherHour objects.
 * @returns {number} The highest temperature.
 */
export const getHighestTemperature = (timeSeries: WeatherHour[]): number =>
  timeSeries.reduce(
    (acc, hour) =>
      acc > hour.parameters.find((param) => param.name === "t")!.values[0]
        ? acc
        : hour.parameters.find((param) => param.name === "t")!.values[0],
    -Infinity
  );

/**
 * Calculates the average wind speed from an array of WeatherHour objects.
 *
 * @param {WeatherHour[]} timeSeries - An array of WeatherHour objects.
 * @returns {number} The average wind speed.
 */
export const getAverageWindSpeed = (timeSeries: WeatherHour[]): number =>
  timeSeries.reduce(
    (acc, hour) =>
      acc + hour.parameters.find((param) => param.name === "ws")!.values[0],
    0
  ) / timeSeries.length;

/**
 * Calculates the average relative humidity from an array of WeatherHour objects.
 *
 * @param {WeatherHour[]} timeSeries - An array of WeatherHour objects.
 * @returns {number} The average relative humidity.
 */
export const getAverageRelativeHumidity = (timeSeries: WeatherHour[]): number =>
  timeSeries.reduce(
    (acc, hour) =>
      acc + hour.parameters.find((param) => param.name === "r")!.values[0],
    0
  ) / timeSeries.length;
