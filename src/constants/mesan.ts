import { IconType } from "react-icons/lib";
import {
  WiCloud,
  WiDayCloudy,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiLightning,
  WiRain,
  WiShowers,
  WiSleet,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export const SMHI_WEATHER_SYMBOLS: Record<
  number,
  {
    label: string;
    icon: IconType;
  }
> = {
  1: { label: "Clear sky", icon: WiDaySunny },
  2: { label: "Nearly clear sky", icon: WiDaySunnyOvercast },
  3: { label: "Variable cloudiness", icon: WiDayCloudy },
  4: { label: "Halfclear sky", icon: WiDayCloudy },
  5: { label: "Cloudy sky", icon: WiCloud },
  6: { label: "Overcast", icon: WiCloud },
  7: { label: "Fog", icon: WiFog },
  8: { label: "Light rain showers", icon: WiRain },
  9: { label: "Moderate rain showers", icon: WiShowers },
  10: { label: "Heavy rain showers", icon: WiShowers },
  11: { label: "Thunderstorm", icon: WiLightning },
  12: { label: "Light sleet showers", icon: WiSleet },
  13: { label: "Moderate sleet showers", icon: WiSleet },
  14: { label: "Heavy sleet showers", icon: WiSleet },
  15: { label: "Light snow showers", icon: WiSnow },
  16: { label: "Moderate snow showers", icon: WiSnow },
  17: { label: "Heavy snow showers", icon: WiSnow },
  18: { label: "Light rain", icon: WiRain },
  19: { label: "Moderate rain", icon: WiRain },
  20: { label: "Heavy rain", icon: WiRain },
  21: { label: "Thunder", icon: WiThunderstorm },
  22: { label: "Light sleet", icon: WiSleet },
  23: { label: "Moderate sleet", icon: WiSleet },
  24: { label: "Heavy sleet", icon: WiSleet },
  25: { label: "Light snowfall", icon: WiSnow },
  26: { label: "Moderate snowfall", icon: WiSnow },
  27: { label: "Heavy snowfall", icon: WiSnow },
};
