import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HourlyForecastGraphProps {
  displayCurrentTemp: boolean;
  hourlyData: { hour: string; temp: number }[];
  unit: string;
}

export default function HourlyForecastGraph({
  displayCurrentTemp,
  hourlyData,
  unit,
}: HourlyForecastGraphProps) {
  return (
    // <div className="w-full h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
    <div className="w-full">
      {/* Combined Card */}
      <div className="bg-surface border-2 border-surface-border rounded-lg shadow-lg p-4">
        {/* Current Temperature Display */}
        {displayCurrentTemp && (
          <>
            <div className="mb-4">
              <h1 className="text-text-main text-lg mb-2">
                Current Temperature
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-primary">
                  {hourlyData[0].temp}
                </span>
                <span className="text-3xl text-text-muted">
                  {unit.slice(0, 1)}
                </span>
              </div>
              <p className="text-text-main mt-4">Average today: {34}°F</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>
          </>
        )}

        {/* Temperature Graph */}
        <div>
          <h2 className="text-xl font-semibold text-text-main mb-4">
            Hourly Temperature
          </h2>
          <div className="overflow-x-auto">
            <div className="w-full lg:w-full" style={{ minWidth: "1200px" }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={hourlyData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="hour"
                    stroke="#999"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="#999"
                    style={{ fontSize: "12px" }}
                    domain={["dataMin - 1", "dataMax + 1"]}
                    label={{
                      value: unit,
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                    }}
                    formatter={(value) => [
                      `${value}°${unit.slice(0, 1)}`,
                      "Temperature",
                    ]}
                  />
                  <Line
                    type="linear"
                    dataKey="temp"
                    stroke="#7f12f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
