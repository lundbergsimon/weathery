import { ExpandedDay, WeatherDay } from "@/app/types";
import DayCard from "../DayCard/DayCard";

interface DailyForecastProps {
  days: WeatherDay[];
  selectedDay: ExpandedDay | null;
  onSelectDay: (date: string) => void;
}

/**
 * A component that displays a daily forecast of weather data in a card
 * format.
 * Accepts an array of WeatherDay objects, a selected day object, and an
 * onSelectDay function as props.
 * @param {WeatherDay[]} days - An array of weather data for the week.
 * @param {ExpandedDay | null} selectedDay - The currently selected day.
 * @param {(date: string) => void} onSelectDay - A function to be called when a
 * day card is clicked.
 * @returns {JSX.Element} - The component.
 */
export default function DailyForecast({
  days,
  selectedDay,
  onSelectDay,
}: DailyForecastProps) {
  const weekDays: WeatherDay[] = Array(7).fill(null);

  days.forEach((day) => {
    let weekDayIndex = new Date(day.date).getDay();
    weekDayIndex = weekDayIndex === 0 ? 6 : weekDayIndex - 1;
    weekDays[weekDayIndex] = day;
  });

  return (
    <section className="daily-forecast-card grid grid-cols-7 gap-2">
      {weekDays.map((day, dayIndex) =>
        day ? (
          <DayCard
            key={dayIndex}
            isSelected={day.date === selectedDay?.date}
            date={day.date}
            hourlyForecast={day.timeSeries}
            onClick={() => onSelectDay(day.date)}
          />
        ) : (
          <div
            key={dayIndex}
            className="border border-surface-border rounded-xl"
          ></div>
        )
      )}
    </section>
  );
}
