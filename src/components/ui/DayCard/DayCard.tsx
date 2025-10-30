import { WeatherHour } from "@/app/types";
import styles from "./DayCard.module.css";

interface DayCardProps {
  isSelected: boolean;
  date: string;
  hourlyForecast: WeatherHour[];
  onClick: () => void;
}

/**
 * A component that displays a single day of weather data in a card
 * format.
 * @param {boolean} isSelected - Whether the card is selected or not.
 * @param {string} date - The date of the day.
 * @param {WeatherHour[]} hourlyForecast - An array of weather data for the day.
 * @param {() => void} onClick - A function to be called when the card is clicked.
 * @returns {JSX.Element} - The component.
 */
export default function DayCard({
  isSelected,
  date,
  hourlyForecast,
  onClick,
}: DayCardProps) {
  const language = "en-US";
  const averageTemperature =
    hourlyForecast.reduce(
      (acc, hour) =>
        acc + hour.parameters.find((param) => param.name === "t")!.values[0],
      0
    ) / hourlyForecast.length;

  const weekDay = new Date(date).toLocaleDateString(language, {
    weekday: "short",
  });
  const formatedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.dayCard} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className="text-xl flex justify-between">
        <span>{weekDay}</span>
        <span>{formatedDate}</span>
      </div>
      <div className="text-text-muted">{averageTemperature.toFixed(1)} °C</div>
    </div>
  );
}
