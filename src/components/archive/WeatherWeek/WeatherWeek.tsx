import { WeatherWeek as IWeatherWeek } from "@/app/types";
import { useState } from "react";
import WeatherDayList from "../WeatherDayList/WeatherDayList";
import WeatherHourList from "../WeatherHourList/WeatherHourList";

interface WeatherWeekProps {
  week: IWeatherWeek;
}

export default function WeatherWeek({ week }: WeatherWeekProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <div>
      <WeatherDayList
        days={week.days}
        selectedDay={selectedDay}
        onSelectDay={(date) =>
          setSelectedDay(date === selectedDay ? null : date)
        }
      />
      {selectedDay && (
        <WeatherHourList
          hours={week.days.find((day) => day.date === selectedDay)?.hours}
          screenSize="large"
        />
      )}
    </div>
  );
}
