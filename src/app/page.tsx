"use client";

import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import WeekCard from "@/components/ui/WeatherCard";
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
    weather,
    error: weatherError,
    loading: weatherLoading,
  } = useWeather(coords?.lat, coords?.lon);

  if (geoLoading || weatherLoading)
    return <LoadingState message="Fetching weather data..." />;

  if (geoError) return <ErrorState message={geoError} />;
  if (weatherError) return <ErrorState message={weatherError} />;

  if (!coords || !weather)
    return <ErrorState message="No weather data available." />;

  return (
    <main className="flex flex-col items-center justify-center p-2">
      <h1 className="text-3xl font-semibold mb-6">Current Weather</h1>
      <WeekCard weather={weather} coords={coords} />
    </main>
  );
}
