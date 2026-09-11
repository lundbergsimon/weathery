import { NextRequest, NextResponse } from "next/server";
import { getWeather } from "../../../api/getWeather";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latStr = searchParams.get("lat");
  const lonStr = searchParams.get("lon");

  if (!latStr || !lonStr) {
    return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
  }

  let lat;
  let lon;

  try {
    lat = Number(latStr);
    lon = Number(lonStr);
  } catch {
    console.error("Lat or lon is not a number");
    return NextResponse.json(
      { error: "Lat and lon has to be a number" },
      { status: 400 },
    );
  }

  try {
    const response = await getWeather(lon, lat);
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
