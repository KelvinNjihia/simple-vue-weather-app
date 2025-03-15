import { shallowMount } from '@vue/test-utils';
import GetLocation from '../GetLocation.vue';
import { vi } from 'vitest';

describe('GeoLocation', (): void => {
  it('renders component without crashing', async (): Promise<void> => {
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: () => {} },
    });
    const wrapper = await shallowMount<typeof GetLocation>(GetLocation);
    expect(wrapper).toBeTruthy();
  });

  it('displays when geolocation is resolved', async (): Promise<void> => {
    const mockGeoLocation = vi.fn(
      (
        successCallback: (position: { coords: { latitude: number; longitude: number } }) => void,
      ) => {
        const position = {
          coords: {
            latitude: 54.98575,
            longitude: -2.8592,
          },
        };
        successCallback(position);
      },
    );

    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: mockGeoLocation },
    });
    const wrapper = await shallowMount<typeof GetLocation>(GetLocation);
    //@ts-expect-error something wrong with coords access
    expect(wrapper.vm.coords).toEqual({
      latitude: 54.98575,
      longitude: -2.8592,
    });
  });

  it('displays when geolocation is rejected', async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const mockGeoLocation = vi.fn((successCallback: Function, errorCallback: Function) => {
      const error = new Error('Location permission denied');
      errorCallback(error);
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: mockGeoLocation },
    });
    const wrapper = await shallowMount<typeof GetLocation>(GetLocation);
    // @ts-expect-error Property access needs to be fixed in component
    expect(wrapper.vm.geolocationBlockedByUser).toEqual(true);
    expect(wrapper.html()).toContain('Geolocation blocked by user');
  });
});
