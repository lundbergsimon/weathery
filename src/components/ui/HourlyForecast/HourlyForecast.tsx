import { WeatherHour } from "@/app/types";
import WeatherHourCard from "../WeatherHourCard";

interface HourlyForecastProps {
  hours?: WeatherHour[];
}

/**
 * A component that displays a list of hourly weather data.
 * Accepts an array of WeatherHour objects as props.
 * @param {HourlyForecastProps} props - An object containing the hourly weather data.
 * @returns {JSX.Element} - The component.
 */
export default function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <section className="hourly-forecast-card grid grid-cols-24 transition-all ease-in-out duration-500">
      {hours &&
        hours.length &&
        hours.map((hour) => (
          <WeatherHourCard key={hour.validTime} data={hour} />
        ))}
    </section>
  );
}
