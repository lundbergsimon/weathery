import { WeatherParameter, WeatherParameterName } from "@/types";

/**
 * Returns the first value of a WeatherParameter with the given name.
 *
 * If no parameter with the given name is found, or if the parameter has no values,
 * this function returns null.
 */
export const getParameterValue = (
  parameters: WeatherParameter[] | undefined,
  name: WeatherParameterName,
) => {
  if (!Array.isArray(parameters)) {
    console.warn("Invalid parameters array passed to getParameterValue");
    return null;
  }

  const param = parameters.find((p) => p.name === name);
  if (!param || param.values.length === 0) {
    console.warn(`No parameter with name "${name}" found`);
    return null;
  }
  return param.values[0];
};
