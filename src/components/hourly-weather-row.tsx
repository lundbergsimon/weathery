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
  const allHours: IHourDate[] = Array.from({ length: 24 }, (_, index) => ({
    hour: index, // 0 = 00:00, 23 = 23:00
    time: "",
    parameters: [],
  }));

  hourlyData?.forEach((hour) => {
    const hourIndex = new Date(hour.time).getHours();
    allHours[hourIndex] = { hour: hourIndex, ...hour };
  });

  return (
    <div className="pb-4">
      {/* Display each hour horizontally */}
      <div className="flex gap-4 [&>*]:flex-1">
        {allHours.map((item, index) => {
          const weatherSymbol = item.time && getWeatherSymbol(item.parameters);
          const temperature =
            item.time && getParameterValue(item.parameters, "t")?.toFixed(0);
          const windDirection = item.time
            ? (getParameterValue(item.parameters, "wd") as number)
            : NaN;
          const windSpeed =
            item.time && getParameterValue(item.parameters, "ws");
          const hour24 = item.hour > 9 ? `${item.hour}:00` : `0${item.hour}:00`;

          return (
            <div key={index} className="text-center cursor-default">
              <p className="text-xs font-bold text-text-muted">{hour24}</p>
              {/* Parameters */}
              {item.time && (
                <div className="flex flex-col">
                  <div className="font-bold">
                    {temperature !== undefined ? temperature : NaN}°
                  </div>
                  {weatherSymbol && (
                    <div className="text-text-muted flex justify-center text-2xl">
                      <WeatherIcon
                        weatherSymbol={weatherSymbol}
                        hour={index + 1}
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
