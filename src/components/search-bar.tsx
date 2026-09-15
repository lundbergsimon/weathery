"use client";

import React, { ChangeEvent, useState } from "react";

interface SearchBarProps {
  onLocationFound: (lat: number, lon: number) => void;
}

export default function SearchBar({
  onLocationFound,
}: Readonly<SearchBarProps>) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (e: ChangeEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/geocoding?q=${encodeURIComponent(query)}`,
      );

      if (response.status === 429) {
        alert("Too many requests. Please slow down!");
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

      const coords = await response.json();
      onLocationFound(coords.lat, coords.lon);
      setQuery("");
      setShowDropdown(false);
    } catch (error) {
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            disabled={isSearching}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          Search
        </button>
      </form>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-gray-600 text-sm">
          Autocomplete not yet available
        </div>
      )}
    </div>
  );
}
