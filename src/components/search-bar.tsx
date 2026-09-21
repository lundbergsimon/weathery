"use client";

import { useDebounce } from "@/hooks/useDebounce";
import type { SearchResult } from "@/types/search";
import { ChangeEvent, useEffect, useState } from "react";

interface SearchBarProps {
  onLocationFound: (lat: number, lon: number) => void;
}

export default function SearchBar({
  onLocationFound,
}: Readonly<SearchBarProps>) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;

    const controller = new AbortController();

    const search = async () => {
      setIsSearching(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
        );

        if (response.status === 429) {
          alert(
            "Server is currently receiving too many requests. Please try again later!",
          );
          return;
        }

        if (!response.ok) {
          // Generic error message to avoid exposing implementation details
          const data = await response.json().catch(() => ({}));
          alert(
            data.error ||
              "An unexpected error occurred while searching for the location.",
          );
          return;
        }

        const data: SearchResult[] = await response.json();
        setResults(data);
        setShowDropdown(true);
      } catch {
        alert(
          "A network error occurred. Please check your internet connection and try again.",
        );
      } finally {
        setIsSearching(false);
      }
    };

    search();

    return () => controller.abort();
  }, [debouncedQuery]);

  const handleSearch = async (e: ChangeEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      // const response = await fetch(
      //   `/api/geocoding?q=${encodeURIComponent(query)}`,
      // );

      // if (response.status === 429) {
      //   alert(
      //     "Server is currently receiving too many requests. Please try again later!",
      //   );
      //   return;
      // }

      // if (!response.ok) {
      //   // Generic error message to avoid exposing implementation details
      //   const data = await response.json().catch(() => ({}));
      //   alert(
      //     data.error ||
      //       "An unexpected error occurred while searching for the location.",
      //   );
      //   return;
      // }

      // const coords = await response.json();
      // onLocationFound(coords.lat, coords.lon);
      if (results.length > 0) {
        onLocationFound(results[0].coords.lat, results[0].coords.lon);
        setQuery("");
        setShowDropdown(false);
      } else {
        alert("No results found. Please try a different search term.");
      }
    } catch {
      alert(
        "A network error occurred. Please check your internet connection and try again.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            placeholder="Search for a city..."
            className="w-full px-4 py-2 rounded-lg border border-surface-border focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-foreground"
            disabled={isSearching}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-4 py-2 bg-neutral-dark text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
        >
          Search
        </button>
      </form>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-surface border border-surface-border rounded-lg shadow-lg p-3 text-foreground text-sm">
          <div className="flex-col">
            {results.map((result) => (
              <div key={result.coords.lat + result.coords.lon}>
                {result.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
