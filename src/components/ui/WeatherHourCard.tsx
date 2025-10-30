import { WeatherHour, WeatherParameter } from "@/app/types";

interface WeatherHourCardProps {
  data?: WeatherHour;
}

/**
 * A component that displays a single hour of weather data.
 * @param {WeatherHour} data - The weather data for the hour.
 */
export default function WeatherHourCard({ data }: WeatherHourCardProps) {
  const hour = new Date(data?.validTime || "").toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
  });

  return (
    <div className="border-x border-surface-border px-2">
      <h1>{hour}</h1>
      <div>
        {data?.parameters.map((param: WeatherParameter) =>
          param?.name === "t" ? (
            <h1 key={param?.name} className="text-text-muted">
              {param?.name}: {param?.values[0]}
            </h1>
          ) : null
        )}
      </div>
    </div>
  );
}
