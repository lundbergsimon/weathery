import { WeatherDay } from "@/app/types";
import clsx from "clsx";
import { Droplets, Wind } from "lucide-react";
import {
  getAverageRelativeHumidity,
  getAverageWindSpeed,
  getHighestTemperature,
  getLowestTemperature,
} from "./WeatherDay.helpers";
import styles from "./WeatherDay.module.css";

interface DayCardProps {
  day: WeatherDay | null;
  isSelected: boolean;
  onSelected?: () => void;
}

export default function DayCard({ day, isSelected, onSelected }: DayCardProps) {
  // const language = "en-US"; // TODO: make this dynamic with a hook
  const isCurrentDay = new Date().toISOString().split("T")[0] === day?.date;

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(styles.dayCard, {
        [styles.currentDay]: isCurrentDay,
        // [styles.selected]: isSelected,
        [styles.hasData]: day !== null,
      })}
      onClick={day ? onSelected : undefined}
    >
      <div className="flex flex-col h-full">
        {day ? (
          <Header
            dateString={day.date}
            isCurrentDay={isCurrentDay}
            isSelected={isSelected}
          />
        ) : null}
        {day ? <Body day={day} /> : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */

interface HeaderProps {
  dateString: string;
  isSelected: boolean;
  isCurrentDay: boolean;
}

function Header({ dateString, isCurrentDay, isSelected }: HeaderProps) {
  return (
    <div className={clsx(styles.date)}>
      <h2
        className={clsx("text-text-main w-fit px-4 rounded-full border-2", {
          "bg-primary border-primary text-white": isCurrentDay,
          "border-transparent": !isSelected,
          "border-primary-border": isSelected,
        })}
      >
        {new Date(dateString).getDate()}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Body                                    */
/* -------------------------------------------------------------------------- */

interface BodyProps {
  day: WeatherDay;
}

function Body({ day }: BodyProps) {
  return (
    <div className="px-2 py-2">
      <div className="text-text-main">
        <table className="w-full text-center">
          <thead className="text-text-muted font-normal text-sm">
            <tr>
              <th>Lowest</th>
              <th>Highest</th>
            </tr>
          </thead>
          <tbody className="text-xl font-bold">
            <tr>
              <td>{getLowestTemperature(day.hours).toFixed(1)}°</td>
              <td>{getHighestTemperature(day.hours).toFixed(1)}°</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-2 border-surface-border" />
      <div className="text-sm flex flex-col gap-1 text-text-muted">
        <div className="flex gap-2" title="Average Relative Humidity">
          <Droplets size={20} />
          <span>{getAverageRelativeHumidity(day.hours).toFixed(1)}%</span>
        </div>
        <div className="flex gap-2" title="Average Wind Speed">
          <Wind size={20} />
          <span>{getAverageWindSpeed(day.hours).toFixed(1)}m/s</span>
        </div>
      </div>
    </div>
  );
}
