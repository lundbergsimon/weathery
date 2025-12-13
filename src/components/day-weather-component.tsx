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
  const formattedData = day.hours.map((hour) => ({
    hour: new Date(hour.validTime),
    parameters: hour.parameters.map((param) => ({
      ...param,
      values: param.values.map((value) => Number(value.toFixed(0))),
    })),
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
          <HourlyWeatherRow data={formattedData} />
        </HorizontalScrollContainer>
      </Card>
    </div>
  );
}
