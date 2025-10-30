import { WeatherDay, WeatherHour, WeatherWeek } from "@/app/types";

/**
 * Calculates the ISO-standard week key (the date of the Monday of that week).
 * @param date - A Date object.
 * @returns A date string in 'YYYY-MM-DD' format for the Monday of the week.
 */
const getWeekKey = (date: Date): string => {
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const day = date.getUTCDay();
  // ISO week starts on Monday (1). Adjust Sunday (0) to 7 for calculation.
  const diff = date.getUTCDate() - (day === 0 ? 6 : day - 1); // Adjust for the Monday
  const monday = new Date(date.getTime());
  monday.setUTCDate(diff);

  // Format as YYYY-MM-DD
  return monday.toISOString().slice(0, 10);
};

/**
 * Groups hourly weather data by week and day.
 * Returns an array of WeatherWeek objects where each week object contains
 * an array of WeatherDay objects. Each WeatherDay object contains an array
 * of WeatherHour objects.
 * @param hourlyData - An array of WeatherHour objects.
 * @returns An array of WeatherWeek objects.
 */
export const groupByWeekAndDay = (hourlyData: WeatherHour[]): WeatherWeek[] => {
  // Map to hold the intermediate structure for efficient access and insertion:
  const groupedDataMap = hourlyData.reduce((acc, currentHour) => {
    // Convert the string timestamp to a Date object
    const date = new Date(currentHour.validTime);

    // 1. Calculate the Grouping Keys
    const weekKey = getWeekKey(date);
    const dayKey = date.toISOString().slice(0, 10); // YYYY-MM-DD

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
        timeSeries: [],
      });
    }

    // 4. Add the current hourly data object to the correct day group
    weekGroup.daysMap.get(dayKey)!.timeSeries.push(currentHour);

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
