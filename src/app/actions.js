'use server';

export async function getWeatherData(lon, lat) {
  try {
    const response = await fetch(
      `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return { error: `SMHI API error: ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}