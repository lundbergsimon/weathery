"use client";

import { useState } from "react";

interface GeoLocation {
  lat: number;
  lon: number;
}

export default function useGeoLocation() {
  const [coords, setCoords] = useState<GeoLocation | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(undefined);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError("Failed to get location. " + err.message);
        setLoading(false);
      },
    );
  };

  const clearError = () => {
    setError("");
  };

  return { coords, error, loading, setCoords, getLocation, clearError };
}
