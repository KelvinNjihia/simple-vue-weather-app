import { shallowMount } from '@vue/test-utils';
import App from './../../App.vue';
import GetLocation from '../GetLocation.vue';

describe('App', (): void => {
  it('should render GetLocation Component', (): void => {
    const wrapper = shallowMount<typeof App>(App);
    expect(wrapper.findComponent(GetLocation).exists()).toBe(true);
  });
});
