"use client";
import { useEffect, useState } from "react";

interface GeoLocation {
  lat: number;
  lon: number;
}

export default function useGeoLocation() {
  const [coords, setCoords] = useState<GeoLocation | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

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
      }
    );
  }, []);

  return { coords, error, loading };
}
