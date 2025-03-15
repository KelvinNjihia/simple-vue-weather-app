import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import WeatherReport from '../WeatherReport.vue';
import { vi } from 'vitest';

describe('WeatherReport', (): void => {
  it('should render component successfully', (): void => {
    global.fetch = vi.fn();
    const wrapper = shallowMount<typeof WeatherReport>(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    });
    expect(wrapper).toBeTruthy();
  });

  it("displays 'loading...' message when data is undefined", (): void => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      }),
    ) as unknown as typeof fetch;

    const wrapper = shallowMount<typeof WeatherReport>(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    });
    expect(wrapper.text()).toContain('Loading...');
  });

  it('displays weather data when data is defined', async () => {
    const mockData = {
      location: {
        name: 'Borgfelde',
        region: 'Hamburg',
        localtime: '2025-03-15 12:18',
      },
      current: {
        temp_c: 5.3,
        temp_f: 41.5,
        condition: {
          text: 'Overcast',
          icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
        },
        wind_mph: 6.9,
        wind_kph: 11.2,
        wind_degree: 52,
        precip_mm: 0.01,
      },
    };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as unknown as typeof fetch;
    const wrapper = mount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    });
    await flushPromises();
    console.log(mockData.current.condition.text, ' This is Overcast');
    expect(wrapper.text()).toContain(mockData.current.condition.text);
    expect(wrapper.text()).toContain(mockData.current.temp_c);
    expect(wrapper.text()).toContain(mockData.location.name);
    expect(wrapper.text()).toContain(mockData.location.region);
    expect(wrapper.text()).toContain(mockData.current.wind_kph);
    expect(wrapper.text()).toContain(mockData.current.wind_degree);
  });

  it('displays formats the datetime to a locale format', async () => {
    const mockDate = new Date(2000, 12, 31, 11, 45, 0, 0);
    vi.setSystemTime(mockDate);
    const mockData = {
      location: {
        localtime: new Date(),
      },
      current: {
        condition: {},
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      }),
    ) as unknown as typeof fetch;

    const wrapper = shallowMount<typeof WeatherReport>(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    });

    await flushPromises();
    const localtime = wrapper.find('[data-testid="localtime"]');
    expect(localtime.text()).toEqual('January 31, 2001 at 11:45 AM');
    vi.useRealTimers();
  });
});
