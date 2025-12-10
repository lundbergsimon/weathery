import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";
import { WeatherHour } from "@/types";
import { WiDirectionUp } from "react-icons/wi";
import Card from "./card";
import WeatherIcon from "./ui/weather-icon";

interface CurrentWeatherCardProps {
  data: WeatherHour;
}

export default function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const currentHour = new Date(data.validTime).getHours();
  const currentSymbol = data.parameters.find((p) => p.name === "Wsymb2")!
    .values[0]!;
  const WeatherSymbol = SMHI_WEATHER_SYMBOLS[currentSymbol]!;

  const temperature = data.parameters
    .find((p) => p.name === "t")!
    .values[0].toFixed(0);
  const windSpeed = data.parameters
    .find((p) => p.name === "ws")!
    .values[0].toFixed(0);
  const windDirection = data.parameters.find((p) => p.name === "wd")!.values[0];
  const humidity = data.parameters.find((p) => p.name === "r")!.values[0];

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