import { SearchResult } from "@/types/search";
import { NextRequest, NextResponse } from "next/server";

interface PhotonFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: string | number;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

interface PhotonResponse {
  type: string;
  features: PhotonFeature[];
}

const search = async (query: string) => {
  const response = await fetch(
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&countrycode=SE&lang=en`,
  );

  if (!response.ok) {
    console.error("Error: " + response.status + " " + response.statusText);
    return {
      status: response.status,
      data: null,
    };
  }

  const data = (await response.json()) as PhotonResponse;

  return {
    status: 200,
    data,
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 },
    );
  }

  if (query.length > 100) {
    return NextResponse.json(
      { error: "Query is too long. Please keep it under 100 characters." },
      { status: 400 },
    );
  }

  const result = await search(query);

  if (!result.data) {
    return NextResponse.json({ error: "Data is empty" }, { status: 404 });
  }

  const formatted: SearchResult[] = result.data?.features.map((f) => ({
    name: f.properties.name,
    coords: {
      lon: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
    },
  }));

  return NextResponse.json(formatted);
}
