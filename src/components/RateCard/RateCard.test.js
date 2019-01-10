import React from 'react';
import { shallow } from 'enzyme';
import RateCard from './RateCard';

it('renders RateCard component without crashing', () => {
  const wrapper = shallow(<RateCard />);
  expect(wrapper.hasClass('rate-card')).toEqual(true);
});
