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
  const { min: minTemp, max: maxTemp } = getMinMaxTemperature(day.hours);
  const formattedHourlyData = day.hours.map((hour) => ({
    dateTimeHour: hour.validTime,
    ...hour,
  }));

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
          <HourlyWeatherRow hourlyData={formattedHourlyData} />
        </HorizontalScrollContainer>
      </Card>
    </div>
  );
}
