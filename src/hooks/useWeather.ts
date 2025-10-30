"use client";
import { WeatherWeek } from "@/app/types";
import getWeather from "@/lib/getWeather";
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
  const [weather, setWeather] = useState<WeatherWeek[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeather(lon, lat);

        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, error, loading };
}
