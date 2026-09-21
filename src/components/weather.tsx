import useWeather from "@/hooks/useWeather";
import CurrentWeatherCard from "./current-weather-card";
import DayWeatherComponent from "./day-weather-component";
import ErrorState from "./ui/error-state";
import LoadingState from "./ui/loading-state";

interface WeatherProps {
  coords?: {
    lat: number;
    lon: number;
  };
}

export default function Weather({ coords }: Readonly<WeatherProps>) {
  const {
    weather: weeks,
    error: weatherError,
    loading: weatherLoading,
  } = useWeather(coords?.lat, coords?.lon);

  if (weatherLoading) return <LoadingState />;
  if (weatherError) return <ErrorState message={weatherError} />;

  const currentWeather = weeks?.[0]?.days?.[0]?.hours?.[0];

  if (!currentWeather)
    return <ErrorState message="No weather data available." />;

  return (
    <div id="content" className="w-full max-w-fit">
      <CurrentWeatherCard data={currentWeather} />

      {/* Display a list of each day's forecast */}
      <section className="flex flex-col gap-4 pt-4 justify-center max-w-fit min-w-0">
        {weeks.map((week) =>
          week.days.map((day) => (
            <DayWeatherComponent key={day.date} day={day} />
          )),
        )}
      </section>
    </div>
  );
}
