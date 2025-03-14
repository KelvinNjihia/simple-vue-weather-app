import { shallowMount } from '@vue/test-utils';
import WindDirection from '../WindDirection.vue';

describe('WindDirection', (): void => {
  it('renders without crashing', (): void => {
    const wrapper = shallowMount(WindDirection, {
      props: {
        degrees: 90,
      },
    });
    expect(wrapper).toBeTruthy();
  });
  it('renders the correct direction of the wind', (): void => {
    const wrapper = shallowMount(WindDirection, {
      props: {
        degrees: 90,
      },
    });
    // const direction = wrapper.find('[data-testid=direction]');
    expect(wrapper.find('[data-testid=direction]').attributes('style')).toContain('rotate(90deg)');
    expect(wrapper.find('[data-testid=direction]').html()).toContain('⬇');
  });
  it('renders correct wind direction for the screen reader', (): void => {
    const wrapper = shallowMount(WindDirection, {
      props: {
        degrees: 90,
      },
    });
    const direction = wrapper.find('[data-testid=direction-sr]');
    expect(direction.classes()).toContain('sr-only');
    expect(direction.html()).toContain('Wind direction: 90');
  });
});
