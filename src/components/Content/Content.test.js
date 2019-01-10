import React from 'react';
import { shallow } from 'enzyme';
import Content from './Content';

it('renders Content component without crashing', () => {
  const wrapper = shallow(<Content />);
  expect(wrapper.hasClass('content')).toEqual(true);
});
