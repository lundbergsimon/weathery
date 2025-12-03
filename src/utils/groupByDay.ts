import { WeatherDay, WeatherHour } from "@/types";

export default async function groupByDay(
  data: WeatherHour[]
): Promise<WeatherDay[]> {
  const groupedData: Record<string, WeatherDay> = {};

  for (const hour of data) {
    const date = hour.validTime.split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = { date, hours: [] };
    }
    groupedData[date].hours.push(hour);
  }

  return Object.values(groupedData);
}
