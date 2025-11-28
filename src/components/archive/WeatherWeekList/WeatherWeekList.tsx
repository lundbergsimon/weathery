import { WeatherWeek as IWeatherWeek } from "@/types";
import WeatherWeek from "../WeatherWeek/WeatherWeek";

interface WeatherWeekListProps {
  weeks: IWeatherWeek[];
}

export default function WeatherWeekList({ weeks }: WeatherWeekListProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {weeks.map((week) => (
        <WeatherWeek key={week.weekStartDate} week={week} />
      ))}
    </div>
  );
}
