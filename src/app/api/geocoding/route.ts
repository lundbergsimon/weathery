import { NextRequest, NextResponse } from "next/server";
import { geocodingService } from "@/api/geocoding";
import { rateLimiter } from "@/api/rate-limiter";

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
  // Simple rate limiting based on IP
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const isAllowed = await rateLimiter.checkLimit(ip);

  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const coordinates = await geocodingService.getCoordinates(query);

  if (!coordinates) {
    return NextResponse.json(
      { error: "Location not found. Please try a different search term." },
      { status: 404 },
    );
  }

  return NextResponse.json(coordinates);
}
