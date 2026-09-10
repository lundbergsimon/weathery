import {
  WeatherDay,
  WeatherHour,
  WeatherParameter,
  WeatherParameterName,
} from "@/types";
import { SMHI_WEATHER_SYMBOLS } from "@/api/smhi/mesan/constants";

/**
 * Returns the first value of a WeatherParameter with the given name.
 *
 * If no parameter with the given name is found, or if the parameter has no values,
 * this function returns null.
 */
export const getParameterValue = (
  parameters: WeatherParameter[] | undefined,
  name: WeatherParameterName,
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

/**
 * Returns a weather symbol or null
 */
export const getWeatherSymbol = (parameters: WeatherParameter[]) => {
  const symbolValue = getParameterValue(parameters, "Wsymb2");
  return symbolValue ? SMHI_WEATHER_SYMBOLS[symbolValue] : null;
};

/**
 * Groups a list of hourly weather data by day.
 */
export async function groupByDay(data: WeatherHour[]): Promise<WeatherDay[]> {
  const groupedData: Record<string, WeatherDay> = {};

  for (const hour of data) {
    const date = hour.time.split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = { date, hours: [] };
    }
    groupedData[date].hours.push(hour);
  }

  return Object.values(groupedData);
}

/**
 * Returns a date as string of the monday of the same week as targetDate.
 */
const getStartOfWeekDateString = (targetDate: Date): string => {
  const dayOfWeek = targetDate.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(targetDate);
  monday.setDate(monday.getDate() - daysToMonday);
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const day = String(monday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Groups hourly weather data by week and day.
 * Returns an array of WeatherWeek objects where each week object contains
 * an array of WeatherDay objects. Each WeatherDay object contains an array
 * of WeatherHour objects.
 */
export const groupByWeekAndDay = (
  hourlyData: WeatherHour[],
  timeZone: string = "Europe/Stockholm",
) => {
  const groupedDataMap = hourlyData.reduce((acc, currentHour) => {
    const utcDate = new Date(currentHour.time);
    if (!(utcDate instanceof Date)) {
      throw new Error("Not a valid Date!");
    }

    const weekStartDate = getStartOfWeekDateString(utcDate);
    const dayKey = utcDate.toLocaleDateString("sv-SE", { timeZone });

    if (!acc.has(weekStartDate)) {
      acc.set(weekStartDate, {
        weekStartDate,
        daysMap: new Map<string, WeatherDay>(),
      });
    }

    const weekGroup = acc.get(weekStartDate)!;

    if (!weekGroup.daysMap.has(dayKey)) {
      weekGroup.daysMap.set(dayKey, {
        date: dayKey,
        hours: [],
      });
    }

    weekGroup.daysMap.get(dayKey)!.hours.push({
      time: currentHour.time,
      parameters: currentHour.parameters,
    });

    return acc;
  }, new Map<string, { weekStartDate: string; daysMap: Map<string, WeatherDay> }>());

  const finalResult = [];

  for (const weekGroup of groupedDataMap.values()) {
    const dailyGroups: WeatherDay[] = Array.from(weekGroup.daysMap.values());
    dailyGroups.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    finalResult.push({
      weekStartDate: weekGroup.weekStartDate,
      days: dailyGroups,
    });
  }

  finalResult.sort(
    (a, b) =>
      new Date(a.weekStartDate).getTime() - new Date(b.weekStartDate).getTime(),
  );

  return finalResult;
};
