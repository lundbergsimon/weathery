import { WeatherHour } from "@/app/types";
import styles from "./DayCard.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DayCardProps {
  isSelected: boolean;
  date: string;
  hourlyForecast: WeatherHour[];
  onClick: () => void;
}

export default function DayCard({
  isSelected,
  date,
  hourlyForecast,
  onClick,
}: DayCardProps) {
  const weekDayIndex = new Date(date).getDay();
  const weekDay = WEEKDAYS[weekDayIndex];
  const averageTemperature =
    hourlyForecast.reduce(
      (acc, hour) =>
        acc + hour.parameters.find((param) => param.name === "t")!.values[0],
      0
    ) / hourlyForecast.length;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.dayCard} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className="text-xl flex justify-between">
        <span>
          {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
        </span>
        <span>
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="text-text-muted">{averageTemperature.toFixed(1)} °C</div>
    </div>
  );
}
