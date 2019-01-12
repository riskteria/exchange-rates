import React from 'react';
import { shallow } from 'enzyme';
import RateCard from './RateCard';

describe('<RateCard />', () => {
  it('renders component without crashing', () => {
    const wrapper = shallow(<RateCard />);

    expect(wrapper).toBeDefined();
    expect(wrapper.hasClass('rate-card')).toEqual(true);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
