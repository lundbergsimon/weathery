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
  const tempRange = getMinMaxTemperature(day.hours);

  return (
    <div key={day.date}>
      <h2 className="text-2xl font-bold mb-1 px-1 flex justify-between">
        <span>{displayWeekDay(day)}</span>
        <span>{displayMonthDay(day)}</span>
      </h2>
      <Card>
        {tempRange.min && tempRange.max && (
          <div className="text-text-main text-lg mb-4">
            {`${tempRange.min}° / ${tempRange.max}°`}
          </div>
        )}
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
