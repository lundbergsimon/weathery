import { WeatherDay, WeatherHour, WeatherWeek } from "@/types";

/**
 * Calculates the ISO-standard week key (the date of the Monday of that week).
 *
 * @param utcDate - A UTC Date object.
 * @param timeZone - The target timezone to use for the date.
 * @returns A date string in 'YYYY-MM-DD' format for the Monday of the week.
 */
const getStartOfWeekDateString = (
  utcDate: Date,
  timeZone: string = "Europe/Stockholm"
): string => {
  // Convert UTC date to target timezone
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(utcDate);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  // Create a date in the target timezone
  const targetDate = new Date(
    `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`
  );

  // Get the day of the week for target date. 0-6 (Sunday-Saturday)
  const dayOfWeek = targetDate.getDay();

  // Calculate days to subtract to get to Monday. 0-6 (Monday-Sunday)
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Get Monday date
  const monday = new Date(targetDate);
  monday.setDate(monday.getDate() - daysToMonday);

  // Format as YYYY-MM-DD
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
 *
 * @param hourlyData - An array of WeatherHour objects.
 * @param timeZone - The target timezone to use for the date.
 * @returns An array of WeatherWeek objects.
 */
export const groupByWeekAndDay = (
  hourlyData: WeatherHour[],
  timeZone: string = "Europe/Stockholm"
): WeatherWeek[] => {
  // Map to hold the intermediate structure for efficient access and insertion:
  const groupedDataMap = hourlyData.reduce((acc, currentHour) => {
    // Convert the string timestamp to a Date object
    const utcDate = new Date(currentHour.validTime);

    // 1. Calculate the Grouping Keys
    const weekKey = getStartOfWeekDateString(utcDate); // YYYY-MM-DD
    const dayKey = utcDate.toLocaleDateString("sv-SE", { timeZone }); // YYYY-MM-DD

    // 2. Initialize the Week Group if it doesn't exist
    if (!acc.has(weekKey)) {
      acc.set(weekKey, {
        weekStartDate: weekKey,
        daysMap: new Map<string, WeatherDay>(), // Use an inner Map for days
      });
    }

    const weekGroup = acc.get(weekKey)!;

    // 3. Initialize the Day Group if it doesn't exist
    if (!weekGroup.daysMap.has(dayKey)) {
      weekGroup.daysMap.set(dayKey, {
        date: dayKey,
        // dayOfWeek: dayOfWeek,
        hours: [],
      });
    }

    // 4. Add the current hourly data object to the correct day group
    weekGroup.daysMap.get(dayKey)!.hours.push(currentHour);

    return acc;
  }, new Map<string, { weekStartDate: string; daysMap: Map<string, WeatherDay> }>());

  // --- CONVERT MAP TO FINAL ARRAY STRUCTURE ---

  const finalResult: WeatherWeek[] = [];

  // Iterate over the Week Groups
  for (const weekGroup of groupedDataMap.values()) {
    const dailyGroups: WeatherDay[] = Array.from(weekGroup.daysMap.values());

    // Sort days within the week to ensure Monday comes before Tuesday, etc.
    dailyGroups.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    finalResult.push({
      weekStartDate: weekGroup.weekStartDate,
      days: dailyGroups,
    });
  }

  // Sort weeks chronologically
  finalResult.sort(
    (a, b) =>
      new Date(a.weekStartDate).getTime() - new Date(b.weekStartDate).getTime()
  );

  return finalResult;
};

/**
 * Returns an array of Date objects representing all the dates in the current
 * local month.
 *
 * @returns {Date[]} An array of Date objects representing all the dates in the current month.
 */
export function getThisMonthDates(): Date[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i = 1) => new Date(year, month, i + 1)
  );
}

export const displayWeekDay = (day: WeatherDay) =>
  day.date === new Date().toISOString().slice(0, 10)
    ? "Today"
    : new Date(day.date).toLocaleString("en-US", {
        weekday: "long",
      });

export const displayMonthDay = (day: WeatherDay) =>
  new Date(day.date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
