"use client";

import CurrentWeatherCard from "@/components/current-weather-card";
import DayWeatherComponent from "@/components/day-weather-component";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import useGeoLocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";

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
              week.days.map((day) => (
                <DayWeatherComponent key={day.date} day={day} />
              ))
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
