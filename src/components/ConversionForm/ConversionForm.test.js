import React from 'react';
import { shallow } from 'enzyme';
import ConversionForm from './ConversionForm';

it('renders ConversionForm component without crashing', () => {
  const wrapper = shallow(<ConversionForm />);
  expect(wrapper.hasClass('conversion-form')).toEqual(true);
});
