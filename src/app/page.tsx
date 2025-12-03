"use client";

import Card from "@/components/card";
import HorizontalScrollContainer from "@/components/horizontal-scroll-container";
import HourlyWeatherRow from "@/components/hourly-weather-row";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import WeatherIcon from "@/components/ui/weather-icon";
import { SMHI_WEATHER_SYMBOLS } from "@/constants/mesan";
import useGeoLocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";
import { WeatherDay, WeatherHour } from "@/types/index";
import { displayMonthDay, displayWeekDay } from "@/utils/helpers";
import { WiDirectionUp } from "react-icons/wi";

/**
 * A page that displays the current weather data for a given location.
 *
 * The page uses the `useGeoLocation` and `useWeather` hooks to fetch the
 * location and weather data respectively. The page displays a loading state
 * while the data is being fetched, and an error state if there is an error
 * fetching the data. If the data is successfully fetched, the page displays a
 * week card component with the weather data.
 */
export default function WeatherPage() {
  const { coords, error: geoError, loading: geoLoading } = useGeoLocation();
  const {
    weather: weeks,
    error: weatherError,
    loading: weatherLoading,
  } = useWeather(coords?.lat, coords?.lon);

  if (geoLoading || weatherLoading)
    return <LoadingState message="Fetching weather data..." />;

  if (geoError) return <ErrorState message={geoError} />;
  if (weatherError) return <ErrorState message={weatherError} />;

  if (coords === undefined || weeks === undefined)
    return <ErrorState message="No weather data available." />;

  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        <div id="content" className="w-full max-w-fit">
          <section>
            <CurrentWeatherCard data={weeks[0].days[0].hours[0]} />
          </section>
          <section
            id="day-list"
            className="flex flex-col gap-4 pt-4 justify-center max-w-fit min-w-0"
          >
            {weeks.map((week) =>
              week.days.map((day) => <DayComponent key={day.date} day={day} />)
            )}
          </section>
        </div>
      </main>
      <footer className="min-h-10">
        <p className="text-xs text-text-muted text-center">
          Data provided by SMHI
        </p>
      </footer>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DayComponent                                */
/* -------------------------------------------------------------------------- */

interface DayComponentProps {
  day: WeatherDay;
}

function DayComponent({ day }: DayComponentProps) {
  const temperatureLow = day.hours.reduce(
    (acc, hour) =>
      Math.min(acc, hour.parameters.find((p) => p.name === "t")!.values[0]!),
    Infinity
  );
  const temperatureHigh = day.hours.reduce(
    (acc, hour) =>
      Math.max(acc, hour.parameters.find((p) => p.name === "t")!.values[0]!),
    -Infinity
  );

  return (
    <div className="" key={day.date}>
      <h2 className="text-2xl font-bold mb-1 px-1 flex justify-between">
        <span>{displayWeekDay(day)}</span>
        <span>{displayMonthDay(day)}</span>
      </h2>
      <Card>
        <div className="text-text-main text-lg mb-4">
          {temperatureLow.toFixed(0)}° / {temperatureHigh.toFixed(0)}°
        </div>
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

/* -------------------------------------------------------------------------- */
/*                             CurrentWeatherCard                             */
/* -------------------------------------------------------------------------- */

interface CurrentWeatherCardProps {
  data: WeatherHour;
}

function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
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
