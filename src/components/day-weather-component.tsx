import { getMinMaxTemperature } from "@/lib/utils";
import { WeatherDay } from "@/types";
import { displayMonthDay, displayWeekDay } from "@/utils/helpers";
import Card from "./card";
import HorizontalScrollContainer from "./horizontal-scroll-container";
import HourlyWeatherRow from "./hourly-weather-row";

interface DayWeatherComponentProps {
  day: WeatherDay;
}

export default function DayWeatherComponent({ day }: DayWeatherComponentProps) {
  const { minTemp, maxTemp } = getMinMaxTemperature(day.hours);

  return (
    <div key={day.date}>
      <h2 className="text-2xl font-bold mb-1 px-1 flex justify-between">
        <span>{displayWeekDay(day)}</span>
        <span>{displayMonthDay(day)}</span>
      </h2>
      <Card>
        {minTemp && maxTemp && (
          <div className="text-text-main text-lg mb-4">
            {`${minTemp}° / ${maxTemp}°`}
          </div>
        )}
        <HorizontalScrollContainer>
          <HourlyWeatherRow hourlyData={day.hours} />
        </HorizontalScrollContainer>
      </Card>
    </div>
  );
}
