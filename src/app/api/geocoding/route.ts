import { NextRequest, NextResponse } from "next/server";
import { geocodingService } from "@/api/geocoding";

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

  const result = await geocodingService.getCoordinates(query);

  if (result.status >= 400) {
    switch (result.status) {
      case 404:
        return NextResponse.json(
          { error: "Location not found. Please try a different search term." },
          { status: 404 },
        );
      case 429:
        return NextResponse.json(
          { error: "System is under heavy load. Please try again later." },
          { status: 429 },
        );
      default:
        return NextResponse.json(
          { error: "Internal Server Error. Could not resolve geolocation." },
          { status: 500 },
        );
    }
  }

  return NextResponse.json(result.data);
}
