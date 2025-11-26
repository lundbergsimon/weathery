import { WeatherDay } from "@/app/types";
import DayCard from "../WeatherDay/WeatherDay";

interface WeatherDayListProps {
  days: WeatherDay[];
  selectedDay: string | null;
  onSelectDay: (date: string) => void;
}

export default function WeatherDayList({
  days,
  selectedDay,
  onSelectDay,
}: WeatherDayListProps) {
  const weekDays: (WeatherDay | null)[] = Array(7).fill(null);

  days.forEach((day) => {
    let weekDayIndex = new Date(day.date).getDay();
    weekDayIndex = weekDayIndex === 0 ? 6 : weekDayIndex - 1;
    weekDays[weekDayIndex] = day;
  });

  return (
    <section className="daily-forecast-card sm:flex sm:flex-col md:grid md:grid-cols-7 gap-2">
      {weekDays.map((day, dayIndex) => (
        <DayCard
          key={dayIndex}
          day={day}
          isSelected={day?.date === selectedDay && day !== null}
          onSelected={day ? () => onSelectDay(day.date) : undefined}
        />
      ))}
    </section>
  );
}
