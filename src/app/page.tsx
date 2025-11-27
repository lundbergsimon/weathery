"use client";

import Card from "@/components/card";
import HorizontalScrollContainer from "@/components/horizontal-scroll-container";
import HourlyWeatherRow from "@/components/hourly-weather-row";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import useGeoLocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";
import { displayMonthDay, displayWeekDay } from "@/utils/helpers";
import React, { useState } from "react";
import { WeatherDay } from "./types";

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
  const [isExpanded, setIsExpanded] = useState(false);

  if (geoLoading || weatherLoading)
    return <LoadingState message="Fetching weather data..." />;

  if (geoError) return <ErrorState message={geoError} />;
  if (weatherError) return <ErrorState message={weatherError} />;

  if (coords === undefined || weeks === undefined)
    return <ErrorState message="No weather data available." />;

  return (
    <>
      <header className="px-2 font-mono flex gap-1 items-baseline">
        <h1>Weathery</h1>
        <h1 className="text-text-muted text-sm">(Alpha)</h1>
      </header>
      <main className="flex flex-col items-center justify-center p-4">
        <div id="content" className="w-full max-w-fit">
          <Card>
            <p className="text-text-muted">Current Weather</p>
            <h1 className="font-bold text-6xl">
              {`${weeks[0].days[0].hours[0].parameters
                .find((param) => param.name === "t")
                ?.values[0].toFixed(0)}°`}
            </h1>
            <p className="text-text-muted">Place</p>
          </Card>
          <section
            id="day-list"
            className="flex flex-col justify-center max-w-fit min-w-0"
          >
            {weeks.map((week) =>
              week.days.map((day) => (
                <DayComponent
                  key={day.date}
                  day={day}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />
              ))
            )}
          </section>
        </div>
      </main>
    </>
  );
}

interface DayComponentProps {
  day: WeatherDay;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

function DayComponent({ day, isExpanded, setIsExpanded }: DayComponentProps) {
  return (
    <div className="" key={day.date}>
      <h2 className="text-2xl font-bold mb-1 px-1 flex justify-between">
        <span>{displayWeekDay(day)}</span>
        <span>{displayMonthDay(day)}</span>
      </h2>
      <Card>
        <HorizontalScrollContainer>
          <HourlyWeatherRow
            data={day.hours.map((hour) => ({
              hour: new Date(hour.validTime),
              parameters: hour.parameters.map((param) => ({
                ...param,
                values: param.values.map((value) => Number(value.toFixed(0))),
              })),
            }))}
            isExpanded={isExpanded}
          />
        </HorizontalScrollContainer>
        <a
          onClick={() => setIsExpanded((prev) => !prev)}
          className="cursor-pointer hover:underline"
        >
          {isExpanded ? "show less" : "show more"}
        </a>
      </Card>
    </div>
  );
}
