import { WeatherDay } from "@/types";
import { displayMonthDay, displayWeekDay } from "@/utils/helpers";
import Card from "./card";
import HorizontalScrollContainer from "./horizontal-scroll-container";
import HourlyWeatherRow from "./hourly-weather-row";

interface DayWeatherComponentProps {
  day: WeatherDay;
}

export default function DayWeatherComponent({ day }: DayWeatherComponentProps) {
  const temperatureLow = day.hours.reduce(
    (acc, hour) =>
      Math.min(acc, hour.parameters.find((p) => p.name === "t")!.values[0]!),
    Infinity
  );
  const temperatureHigh = day.hours.reduce(
    (acc, hour) =>
      Math.max(acc, hour.parameters.find((p) => p.name === "t")!.values[0]!),
    -Infinity
  );

  return (
    <div className="" key={day.date}>
      <h2 className="text-2xl font-bold mb-1 px-1 flex justify-between">
        <span>{displayWeekDay(day)}</span>
        <span>{displayMonthDay(day)}</span>
      </h2>
      <Card>
        <div className="text-text-main text-lg mb-4">
          {temperatureLow.toFixed(0)}° / {temperatureHigh.toFixed(0)}°
        </div>
        <HorizontalScrollContainer>
          <HourlyWeatherRow
            data={day.hours.map((hour) => ({
              hour: new Date(hour.validTime),
              parameters: hour.parameters.map((param) => ({
                ...param,
                values: param.values.map((value) => Number(value.toFixed(0))),
              })),
            }))}
          />
        </HorizontalScrollContainer>
      </Card>
    </div>
  );
}
