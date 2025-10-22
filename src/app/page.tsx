// app/page.js
"use client";

import { useEffect, useState } from "react";
import { getWeatherData } from "./actions";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lon: string; lat: string } | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lon = position.coords.longitude.toFixed(4);
        const lat = position.coords.latitude.toFixed(4);

        setCoordinates({ lon, lat });

        // Fetch weather data using Server Action
        const result = await getWeatherData(lon, lat);

        if (result.error) {
          setError(result.error);
          setWeatherData(null);
        } else {
          setWeatherData(result.data);
        }

        setLoading(false);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred");
        }
      }
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {coordinates ? (
        <p className="mt-4 text-gray-600">
          Location: {coordinates.lat}, {coordinates.lon}
        </p>
      ) : (
        <p>Loading location...</p>
      )}

      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Weather Data:</h2>
          <pre className="bg-gray-700 p-4 rounded overflow-auto">
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
