import { WeatherParameter } from "@/types";

interface HourlyWeatherRowProps {
  data: { hour: Date; parameters: WeatherParameter[] }[];
  isExpanded: boolean;
}

export default function HourlyWeatherRow({
  data,
  isExpanded,
}: HourlyWeatherRowProps) {
  return (
    <div className="pb-4">
      {/* Display each hour horizontally */}
      <div className="flex gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center cursor-default">
            <p className="text-xs font-bold text-text-muted">
              {new Date(item.hour).toLocaleString("en-US", {
                hour: "numeric",
                hour12: false,
                minute: "numeric",
              })}
            </p>
            <p className="font-bold">{item.parameters[0].values[0]}°</p>
            {isExpanded && (
              <div>
                <p className="text-xs text-text-muted">
                  {item.parameters[1].values[0]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
