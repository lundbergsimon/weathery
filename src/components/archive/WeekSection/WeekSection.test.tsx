import { WeatherWeek } from '@/app/types';
import WeekSection from '@/components/archive/WeekSection/WeekSection';
import { render } from '@testing-library/react';
import React from 'react';

describe('WeekSection', () => {
  const mockWeek: WeatherWeek = {
    weekStartDate: '2022-01-01',
    days: [
      { date: '2022-01-01', hours: [] },
      { date: '2022-01-02', hours: [] },
      { date: '2022-01-03', hours: [] },
      { date: '2022-01-04', hours: [] },
      { date: '2022-01-05', hours: [] },
      { date: '2022-01-06', hours: [] },
      { date: '2022-01-07', hours: [] },
    ],
  };

  // it('renders the WeekSection component', () => {
  //   const { container } = render(<WeekSection week={mockWeek} screenSize="small" />);
  //   expect(container).toMatchSnapshot();
  // });

  it('renders the correct amount of DayCards', () => {
    const { getAllByTestId } = render(<WeekSection week={mockWeek} screenSize="small" />);
    expect(getAllByTestId('day-card')).toHaveLength(7);
  });
});