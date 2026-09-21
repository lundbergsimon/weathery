"use client";

import ErrorState from "@/components/ui/error-state";
import LoadingState from "@/components/ui/loading-state";
import useGeoLocation from "@/hooks/useGeolocation";
import SearchBar from "@/components/search-bar";
import Weather from "@/components/weather";

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
  const {
    coords,
    error: geoError,
    loading: geoLoading,
    setCoords,
    getLocation,
    clearError,
  } = useGeoLocation();

  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        {process.env.NEXT_PUBLIC_ENABLE_SEARCH_BAR === "true" && (
          <SearchBar
            onLocationFound={(lat, lon) => {
              clearError();
              setCoords({ lat, lon });
            }}
            onGetCurrentLocation={getLocation}
          />
        )}
        {geoLoading && <LoadingState />}
        {geoError && <ErrorState message={geoError} />}
        {coords && <Weather coords={coords} />}
      </main>
      <footer className="min-h-10">
        <p className="text-xs text-text-muted text-center">
          Data provided by SMHI
        </p>
      </footer>
    </>
  );
}
