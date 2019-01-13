import React from 'react';
import { shallow } from 'enzyme';
import ConversionForm from './ConversionForm';

describe('<ConversionForm />', () => {
  it('renders component without crashing', () => {
    const wrapper = shallow(<ConversionForm />);

    expect(wrapper).toBeDefined();
    expect(wrapper.hasClass('conversion-form')).toEqual(true);

    wrapper.unmount();
  });
});
