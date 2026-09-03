import { getParameterValue, getWeatherSymbol } from "@/lib/utils";
import { WeatherHour } from "@/types";
import { WiDirectionUp } from "react-icons/wi";
import WeatherIcon from "./ui/weather-icon";

type IHourDate = WeatherHour & {
  hour: number;
};

interface HourlyWeatherRowProps {
  hourlyData: WeatherHour[]; // Hourly weather data for a specific day
}

export default function HourlyWeatherRow({
  hourlyData,
}: HourlyWeatherRowProps) {
  // Create an array of 24 hours, filling in the data for each hour if available
  const allHours: (IHourDate | null)[] = Array.from({ length: 24 }, () => null);
  hourlyData?.forEach((hour) => {
    const hourIndex = new Date(hour.time).getHours();
    allHours[hourIndex] = { hour: hourIndex, ...hour };
  });

  return (
    <div className="pb-4">
      {/* Display each hour horizontally */}
      <div className="flex gap-4 [&>*]:flex-1">
        {allHours.map((item, hourIndex) => {
          const weatherSymbol = item && getWeatherSymbol(item.parameters);
          const temperature =
            item && getParameterValue(item.parameters, "t")?.toFixed(0);
          const windDirection = item
            ? (getParameterValue(item.parameters, "wd") as number)
            : NaN;
          const windSpeed = item && getParameterValue(item.parameters, "ws");
          const hourStr =
            hourIndex > 9 ? `${hourIndex}:00` : `0${hourIndex}:00`;

          return (
            <div key={hourIndex} className="text-center cursor-default">
              <p className="text-xs font-bold text-text-muted">{hourStr}</p>
              {/* Parameters */}
              {item && (
                <div className="flex flex-col">
                  <div className="font-bold">
                    {temperature !== undefined ? temperature : NaN}°
                  </div>
                  {weatherSymbol && (
                    <div className="text-text-muted flex justify-center text-2xl">
                      <WeatherIcon
                        weatherSymbol={weatherSymbol}
                        hour={hourIndex}
                      />
                    </div>
                  )}
                  <div className="text-text-muted flex justify-center text-2xl">
                    <WiDirectionUp
                      style={{
                        rotate: `${180 + windDirection}deg`,
                      }}
                      title={`${180 + windDirection} degrees`}
                      aria-label={`Wind direction`}
                    />
                  </div>
                  <div className="text-text-muted flex justify-center text-xs">
                    {windSpeed} m/s
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
