import { WeatherDay, WeatherWeek } from "@/app/types";
import { useState } from "react";
import DayCard from "../WeatherDay/WeatherDay";
import HourlyForecast from "../WeatherHourList/WeatherHourList";

interface WeekSectionProps {
  week: WeatherWeek;
  screenSize: "small" | "medium" | "large";
}

export default function WeekSection({ screenSize, week }: WeekSectionProps) {
  const [selectedDate, setSelectedDate] = useState<WeatherDay | null>(null);

  const days: (WeatherDay | null)[] = Array(7).fill(null);

  week.days.forEach((day) => {
    let weekDayIndex = new Date(day.date).getDay();
    weekDayIndex = weekDayIndex === 0 ? 6 : weekDayIndex - 1;
    days[weekDayIndex] = day;
  });

  if (!days.length) return <div>No data</div>;

  return (
    <section className="flex flex-col gap-2">
      <div
        // className={clsx("gap-2", screenSize === "large" ? "grid grid-cols-7 gap-2" : "flex flex-col")}
        className="gap-2 lg:grid lg:grid-cols-7 flex flex-col"
      >
        {days.map((day, index) => (
          <div key={index} data-testid="day-card">
            <DayCard
              day={day}
              isSelected={selectedDate?.date === day?.date && day !== null}
              onSelected={() =>
                setSelectedDate(() =>
                  day?.date === selectedDate?.date ? null : day
                )
              }
            />
            {/* {day && <LineChart
              series={[
                { curve: "linear", data: day.hours.map((hour) => hour.parameters[0].values[0]) },
              ]}
            />} */}
            {screenSize === "small" &&
              selectedDate?.date === day?.date &&
              selectedDate !== null && (
                <HourlyForecast hours={day?.hours} screenSize={screenSize} />
              )}
          </div>
        ))}
      </div>
      {/* {screenSize === "large" && selectedDate !== null && (
        <HourlyForecast hours={selectedDate?.hours} screenSize={screenSize} />
      )} */}
    </section>
  );
}
