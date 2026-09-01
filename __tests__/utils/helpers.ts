import "@testing-library/jest-dom";
import {
  displayMonthDay,
  displayWeekDay,
  groupByWeekAndDay,
} from "@/utils/helpers";
import { WeatherDay, WeatherHour } from "@/types";

describe("displayWeekDay", () => {
  it("should return 'Today' for today's date", () => {
    const today = new Date().toISOString().slice(0, 10);
    const day = { date: today } as WeatherDay;
    expect(displayWeekDay(day)).toBe("Today");
  });

  it("should return the correct weekday for a date that is not today", () => {
    const date = new Date("2026-08-31T00:00:00Z").toISOString().slice(0, 10);
    const day = { date } as WeatherDay;
    expect(displayWeekDay(day)).toBe("Monday");
  });
});

describe("displayMonthDay", () => {
  it("should return the correct month and day for a given date", () => {
    const date = new Date("2026-08-31T00:00:00Z").toISOString().slice(0, 10);
    const day = { date } as WeatherDay;
    expect(displayMonthDay(day)).toBe("Aug 31");
  });

  it("should return the correct month and day at 23:00", () => {
    const date = new Date("2026-08-31T23:00:00Z").toISOString().slice(0, 10);
    const day = { date } as WeatherDay;
    expect(displayMonthDay(day)).toBe("Aug 31");
  });

  it("should return the correct month and day at 00:00", () => {
    const date = new Date("2026-08-31T00:00:00Z").toISOString().slice(0, 10);
    const day = { date } as WeatherDay;
    expect(displayMonthDay(day)).toBe("Aug 31");
  });
});

describe("groupByWeekAndDay", () => {
  it("should group WeatherDay objects by week and day", () => {
    const weatherHours: WeatherHour[] = [
      { time: "2026-08-28T00:00:00Z" } as WeatherHour,
      { time: "2026-08-29T00:00:00Z" } as WeatherHour,
      { time: "2026-08-30T00:00:00Z" } as WeatherHour,

      { time: "2026-08-31T00:00:00Z" } as WeatherHour,
      { time: "2026-09-01T00:00:00Z" } as WeatherHour,
      { time: "2026-09-02T00:00:00Z" } as WeatherHour,
    ];
    const grouped = groupByWeekAndDay(weatherHours);
    expect(grouped).toEqual([
      {
        weekStartDate: "2026-08-24",
        days: [
          {
            date: "2026-08-28",
            hours: [{ time: "2026-08-28T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
          {
            date: "2026-08-29",
            hours: [{ time: "2026-08-29T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
          {
            date: "2026-08-30",
            hours: [{ time: "2026-08-30T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
        ],
      },
      {
        weekStartDate: "2026-08-31",
        days: [
          {
            date: "2026-08-31",
            hours: [{ time: "2026-08-31T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
          {
            date: "2026-09-01",
            hours: [{ time: "2026-09-01T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
          {
            date: "2026-09-02",
            hours: [{ time: "2026-09-02T00:00:00Z" } as WeatherHour],
          } as WeatherDay,
        ],
      },
    ]);
  });
});
