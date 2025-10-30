import { WeatherWeek } from "@/app/types";
import WeekList from "./WeekList";
interface WeatherCardProps {
  weather: WeatherWeek[];
  coords: { lat: number; lon: number };
}

/**
 * A component that displays a week of weather data in a card
 * format.
 *
 * @param {WeatherWeek[]} weather - An array of weather data for the week.
 * @param {{lat: number, lon: number}} coords - The coordinates of the location.
 * @returns {JSX.Element} - The component.
 */
export default function WeatherCard({ weather, coords }: WeatherCardProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1>WeekCard</h1>
      <p>coords: {JSON.stringify(coords, null, 2)}</p>
      <div className="w-full flex justify-center">
        <div className="w-full">
          <WeekList weather={weather} />
        </div>
      </div>
    </div>
  );
}
