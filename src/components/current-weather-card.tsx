import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";
import { getParameterValue } from "@/lib/utils";
import { WeatherHour } from "@/types";
import { WiDirectionUp } from "react-icons/wi";
import Card from "./card";
import WeatherIcon from "./ui/weather-icon";

interface CurrentWeatherCardProps {
  data: WeatherHour;
}

export default function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const currentHour = new Date(data.validTime).getHours();
  const currentSymbol = getParameterValue(data.parameters, "Wsymb2");
  const WeatherSymbol = currentSymbol && SMHI_WEATHER_SYMBOLS[currentSymbol];

  const temperature = getParameterValue(data.parameters, "t")?.toFixed(0);
  const windSpeed = getParameterValue(data.parameters, "ws")?.toFixed(0);
  const windDirection = getParameterValue(data.parameters, "wd")?.toFixed(0);
  const humidity = getParameterValue(data.parameters, "r")?.toFixed(0);

  return (
    <Card>
      <p className="text-text-muted">Current Weather</p>
      <div className="flex">
        <h1 className="font-bold text-6xl pr-[10%]">{temperature}°</h1>
        <div className="text-text-muted">
          <div className="flex items-center">
            <span className="mr-1">Wind: </span>
            <span className="text-text-main font-bold">{windSpeed} m/s</span>
            <WiDirectionUp
              className="inline text-text-main"
              size={30}
              style={{ rotate: `${windDirection}deg` }}
            />
          </div>

          <div className="flex items-center">
            <span className="mr-1">Humidity:</span>
            <span className="text-text-main font-bold">{humidity}%</span>
          </div>
        </div>
      </div>
      {WeatherSymbol && (
        <span className="text-text-muted text-3xl">
          <WeatherIcon weatherSymbol={WeatherSymbol} hour={currentHour} />
        </span>
      )}
    </Card>
  );
}
