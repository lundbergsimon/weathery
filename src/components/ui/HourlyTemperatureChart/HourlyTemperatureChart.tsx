import { WeatherDay } from "@/app/types";
import { LineChart } from "@mui/x-charts";

interface HourlyTemperatureChartProps {
  day: WeatherDay;
}

export default function HourlyTemperatureChart({
  day,
}: HourlyTemperatureChartProps) {
  if (!day || !day.hours) return <div>no data</div>;

  const temperatures = day.hours.map((hour) => hour.parameters[0].values[0]);

  if (!temperatures) return <div>no data</div>;

  console.log(temperatures);

  return (
    <>
      <LineChart
        series={[
          {
            curve: "linear",
            data: temperatures,
          },
        ]}
      />
      hours: {day.hours.length}
      day: {day.date}
    </>
  );
}
