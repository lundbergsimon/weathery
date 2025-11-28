import { WeatherHour as IWeatherHour } from "@/types";
import clsx from "clsx";
import WeatherHour from "../WeatherHour/WeatherHour";

interface WeatherHourListProps {
  hours?: IWeatherHour[];
  screenSize: string;
}

/**
 * A component that displays a list of hourly weather data.
 * Accepts an array of WeatherHour objects as props.
 */
export default function WeatherHourList({
  hours,
  screenSize,
}: WeatherHourListProps) {
  const allHours: IWeatherHour[] = Array(24).fill(null);

  hours?.forEach((hour) => {
    const hourIndex = new Date(hour.validTime).getUTCHours();
    allHours[hourIndex] = hour;
  });

  return (
    <section
      className={clsx(
        "gap-1 lg:grid lg:grid-cols-12 flex flex-col",
        screenSize === "large" &&
          "grid grid-cols-12 gap-2 transition-all ease-in-out duration-500 mt-2"
      )}
    >
      {allHours &&
        allHours.length &&
        allHours.map((hour, index) => (
          <WeatherHour key={index} hour={index.toString()} data={hour} />
        ))}
    </section>
  );
}
