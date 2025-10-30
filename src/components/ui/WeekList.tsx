import { ExpandedDay, WeatherWeek } from "@/app/types";
import { useState } from "react";
import DailyForecast from "./DailyForecast/DailyForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";

interface WeekListProps {
  weather: WeatherWeek[];
}

export default function WeekList({ weather }: WeekListProps) {
  const [expandedDay, setExpandedDay] = useState<ExpandedDay | null>(null);

  return (
    <section className="flex flex-col gap-2">
      {weather.map((week: WeatherWeek, weekIndex: number) => (
        <div key={weekIndex} className="flex flex-col gap-2">
          <DailyForecast
            days={week.days}
            selectedDay={expandedDay}
            onSelectDay={(date: string) =>
              setExpandedDay({ weekStartDate: week.weekStartDate, date })
            }
          />
          {expandedDay?.weekStartDate === week.weekStartDate && (
            <HourlyForecast
              hours={
                week.days.find((day) => day.date === expandedDay.date)
                  ?.timeSeries
              }
            />
          )}
        </div>
      ))}
    </section>
  );
}
