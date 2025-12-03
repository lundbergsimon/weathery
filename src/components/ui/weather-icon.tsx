import { IconType } from "react-icons/lib";

interface WeatherIconProps {
  weatherSymbol: { label: string; icon: { day: IconType; night: IconType } };
  hour: number;
}

export default function WeatherIcon({ weatherSymbol, hour }: WeatherIconProps) {
  return hour < 18 && hour >= 6 ? (
    <weatherSymbol.icon.day
      title={weatherSymbol.label}
      aria-label={weatherSymbol.label}
    />
  ) : (
    <weatherSymbol.icon.night
      title={weatherSymbol.label}
      aria-label={weatherSymbol.label}
    />
  );
}
