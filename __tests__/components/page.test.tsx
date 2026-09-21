import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import WeatherPage from "../../src/app/page";
import useGeoLocation from "../../src/hooks/useGeolocation";
import useWeather from "../../src/hooks/useWeather";

jest.mock("../../src/hooks/useGeolocation");
jest.mock("../../src/hooks/useWeather");

const mockedUseGeoLocation = useGeoLocation as jest.Mock;
const mockedUseWeather = useWeather as jest.Mock;

const mockWeatherData = [
  {
    days: [
      {
        date: "2026-09-11",
        hours: [{ temp: 20, date: "2026-09-11T12:00", parameters: [] }],
      },
    ],
  },
];

describe("WeatherPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when fetching data", () => {
    mockedUseGeoLocation.mockReturnValue({
      coords: null,
      error: null,
      loading: true,
    });
    mockedUseWeather.mockReturnValue({
      weather: null,
      error: null,
      loading: true,
    });

    render(<WeatherPage />);
    expect(screen.getByText(/Fetching weather data.../i)).toBeInTheDocument();
  });

  it("renders error state when geo-location fails", () => {
    mockedUseGeoLocation.mockReturnValue({
      coords: null,
      error: "Geo error",
      loading: false,
    });
    mockedUseWeather.mockReturnValue({
      weather: null,
      error: null,
      loading: false,
    });

    render(<WeatherPage />);
    expect(screen.getByText(/geo error/i)).toBeInTheDocument();
  });

  it("renders error state when weather fetch fails", () => {
    mockedUseGeoLocation.mockReturnValue({
      coords: { lat: 1, lon: 1 },
      error: null,
      loading: false,
    });
    mockedUseWeather.mockReturnValue({
      weather: null,
      error: "Weather error",
      loading: false,
    });

    render(<WeatherPage />);
    expect(screen.getByText(/weather error/i)).toBeInTheDocument();
  });

  it("renders weather data successfully", () => {
    mockedUseGeoLocation.mockReturnValue({
      coords: { lat: 1, lon: 1 },
      error: null,
      loading: false,
    });
    mockedUseWeather.mockReturnValue({
      weather: mockWeatherData,
      error: null,
      loading: false,
    });

    render(<WeatherPage />);
    expect(screen.getByText(/data provided by smhi/i)).toBeInTheDocument();
  });
});
