import { getParameterValue, getWeatherSymbol } from "@/lib/utils";
import { WeatherParameter } from "@/types";
import { WiDirectionUp } from "react-icons/wi";
import WeatherIcon from "./ui/weather-icon";

interface HourlyWeatherRowProps {
  data: { hour: Date; parameters: WeatherParameter[] }[];
}

export default function HourlyWeatherRow({ data }: HourlyWeatherRowProps) {
  return (
    <div className="pb-4">
      {/* Display each hour horizontally */}
      <div className="flex gap-4">
        {data.map((item, index) => {
          const hour = new Date(item.hour).getHours();
          const weatherSymbol = getWeatherSymbol(item.parameters);
          const temperature = getParameterValue(item.parameters, "t");
          const windDirection = getParameterValue(item.parameters, "wd");
          const windSpeed = getParameterValue(item.parameters, "ws");

          return (
            <div key={index} className="text-center cursor-default">
              <p className="text-xs font-bold text-text-muted">
                {new Date(item.hour).toLocaleString("en-US", {
                  hour: "numeric",
                  hour12: false,
                  minute: "numeric",
                })}
              </p>
              <p className="font-bold">{temperature || NaN}°</p>
              {weatherSymbol && (
                <span className="text-text-muted flex justify-center text-2xl">
                  <WeatherIcon weatherSymbol={weatherSymbol} hour={hour} />
                </span>
              )}
              <span className={`text-text-muted flex justify-center text-2xl`}>
                <WiDirectionUp
                  style={{
                    rotate: `${windDirection}deg`,
                  }}
                  title={`${windDirection} degrees`}
                  aria-label={`Wind direction`}
                />
              </span>
              <span className="text-text-muted flex justify-center text-xs">
                {windSpeed} m/s
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
