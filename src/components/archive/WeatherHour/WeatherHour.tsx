import { WeatherHour as IWeatherHour, WeatherParameter } from "@/types";
import clsx from "clsx";

interface WeatherHourCardProps {
  hour: string;
  data?: IWeatherHour;
}

/**
 * A component that displays a single hour of weather data.
 * @param {WeatherHour} data - The weather data for the hour.
 */
export default function WeatherHour({ hour, data }: WeatherHourCardProps) {
  return (
    <div
      className={clsx(
        "border rounded-xl border-surface-border px-2 flex gap-2 lg:flex-col lg:gap-0",
        { "bg-surface": !!data }
      )}
    >
      <p className="text-text-muted text-center">{hour}</p>
      <div>
        {data ? (
          data.parameters.map((param: WeatherParameter) =>
            param?.name === "t" ? (
              <p key={param?.name} className="text-text-main">
                {param?.values[0]}°
              </p>
            ) : null
          )
        ) : (
          <p className="text-text-main"></p>
        )}
      </div>
    </div>
  );
}
