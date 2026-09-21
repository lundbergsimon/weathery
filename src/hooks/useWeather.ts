"use client";

import { WeatherWeek } from "@/types";
import { useEffect, useState } from "react";

/**
 * A hook that fetches weather data from the SMHI API based on the given
 * latitude and longitude.
 * @param {number} [lat] - The latitude of the location.
 * @param {number} [lon] - The longitude of the location.
 * @returns {Object} - An object containing the weather data, error and loading
 *   states.
 */
export default function useWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<WeatherWeek[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

        if (!res.ok) {
          throw new Error(
            res.status === 429
              ? "Too many requests"
              : "Failed to fetch weather data.",
          );
        }

        const data: WeatherWeek[] = await res.json();

        setWeather(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, error, loading };
}
