import { shallowMount } from '@vue/test-utils';
import GetLocation from '../GetLocation.vue';

describe('GeoLocation', (): void => {
  it('renders component without crashing', async (): Promise<void> => {
    const wrapper = await shallowMount<typeof GetLocation>(GetLocation);
    expect(wrapper).toBeTruthy();
  });
});
