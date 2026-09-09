import { WeatherDay } from "@/types";

/**
 * Returns an array of Date objects representing all the dates in the current
 * local month.
 */
export function getThisMonthDates(): Date[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i = 1) => new Date(year, month, i + 1),
  );
}

/**
 * Returns "Today" if it is today else it returns the week day e.g.,
 * "Monday".
 */
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
