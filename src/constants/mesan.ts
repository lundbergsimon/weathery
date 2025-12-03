import { IconType } from "react-icons/lib";
import {
  WiCloud,
  WiDayCloudy,
  WiDayFog,
  WiDayRain,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiLightning,
  WiNightClear,
  WiNightCloudy,
  WiNightFog,
  WiNightLightning,
  WiNightPartlyCloudy,
  WiNightRain,
  WiNightSleet,
  WiNightSnow,
  WiNightThunderstorm,
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
    icon: { day: IconType; night: IconType };
  }
> = {
  1: {
    label: "Clear sky",
    icon: { day: WiDaySunny, night: WiNightClear },
  },
  2: {
    label: "Nearly clear sky",
    icon: { day: WiDaySunnyOvercast, night: WiNightPartlyCloudy },
  },
  3: {
    label: "Variable cloudiness",
    icon: { day: WiDayCloudy, night: WiNightCloudy },
  },
  4: {
    label: "Halfclear sky",
    icon: { day: WiDayCloudy, night: WiNightCloudy },
  },
  5: {
    label: "Cloudy sky",
    icon: { day: WiCloud, night: WiNightCloudy },
  },
  6: {
    label: "Overcast",
    icon: { day: WiCloud, night: WiCloud },
  },
  7: {
    label: "Fog",
    icon: { day: WiDayFog, night: WiNightFog },
  },
  8: {
    label: "Light rain showers",
    icon: { day: WiRain, night: WiNightRain },
  },
  9: {
    label: "Moderate rain showers",
    icon: { day: WiShowers, night: WiShowers },
  },
  10: {
    label: "Heavy rain showers",
    icon: { day: WiShowers, night: WiShowers },
  },
  11: {
    label: "Thunderstorm",
    icon: { day: WiLightning, night: WiNightLightning },
  },
  12: {
    label: "Light sleet showers",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  13: {
    label: "Moderate sleet showers",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  14: {
    label: "Heavy sleet showers",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  15: {
    label: "Light snow showers",
    icon: { day: WiSnow, night: WiNightSnow },
  },
  16: {
    label: "Moderate snow showers",
    icon: { day: WiSnow, night: WiNightSnow },
  },
  17: {
    label: "Heavy snow showers",
    icon: { day: WiSnow, night: WiNightSnow },
  },
  18: {
    label: "Light rain",
    icon: { day: WiDayRain, night: WiNightRain },
  },
  19: {
    label: "Moderate rain",
    icon: { day: WiRain, night: WiRain },
  },
  20: {
    label: "Heavy rain",
    icon: { day: WiRain, night: WiRain },
  },
  21: {
    label: "Thunder",
    icon: { day: WiThunderstorm, night: WiNightThunderstorm },
  },
  22: {
    label: "Light sleet",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  23: {
    label: "Moderate sleet",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  24: {
    label: "Heavy sleet",
    icon: { day: WiSleet, night: WiNightSleet },
  },
  25: {
    label: "Light snowfall",
    icon: { day: WiSnow, night: WiNightSnow },
  },
  26: {
    label: "Moderate snowfall",
    icon: { day: WiSnow, night: WiNightSnow },
  },
  27: {
    label: "Heavy snowfall",
    icon: { day: WiSnow, night: WiNightSnow },
  },
};
