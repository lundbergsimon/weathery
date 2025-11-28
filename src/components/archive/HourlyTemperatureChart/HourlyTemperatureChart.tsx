import { WeatherDay } from "@/types";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts";

interface HourlyTemperatureChartProps {
  day: WeatherDay;
}

export default function HourlyTemperatureChart({
  day,
}: HourlyTemperatureChartProps) {
  const theme = useTheme();

  if (!day || !day.hours) return <div>no data</div>;

  const temperatures = day.hours.map((hour) => hour.parameters[0].values[0]);

  if (!temperatures) return <div>no data</div>;

  const themeColors = (mode: "light" | "dark") => {
    if (mode === "dark") {
      return ["#4FC3F7", "#FFB74D", "#A1887F"]; // Example dark mode colors
    }
    return ["#4FC3F7", "#FFB74D", "#A1887F"];
    return [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      "#6A1B9A",
    ]; // Example light mode colors
  };

  return (
    <>
      <LineChart
        sx={{
          "& .MuiChartsAxis-line": {
            stroke: theme.palette.text.primary, // Changes the line color
            strokeWidth: 2, // Optional: Make the line thicker
          },
        }}
        series={[
          {
            curve: "linear",
            data: temperatures,
          },
        ]}
        colors={themeColors}
      />
      hours: {day.hours.length}
      day: {day.date}
    </>
  );
}
