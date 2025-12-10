import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";
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
          const symbolValue = Number(
            item.parameters.find((p) => p.name === "Wsymb2")!.values[0]
          );
          const WeatherSymbol = SMHI_WEATHER_SYMBOLS[symbolValue];
          const hour = new Date(item.hour).getHours();
          const windDirection = item.parameters.find((p) => p.name === "wd")!.values[0];
          const windSpeed = item.parameters.find((p) => p.name === "ws")!.values[0];

          return (
            <div key={index} className="text-center cursor-default">
              <p className="text-xs font-bold text-text-muted">
                {new Date(item.hour).toLocaleString("en-US", {
                  hour: "numeric",
                  hour12: false,
                  minute: "numeric",
                })}
              </p>
              <p className="font-bold">{item.parameters[0].values[0]}°</p>
              {WeatherSymbol && (
                <span className="text-text-muted flex justify-center text-2xl">
                  <WeatherIcon weatherSymbol={WeatherSymbol} hour={hour} />
                </span>
              )}
              <span className={`text-text-muted flex justify-center text-2xl`}>
                <WiDirectionUp
                  style={{
                    rotate: `${windDirection}deg`
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
