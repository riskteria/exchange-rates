import React from 'react';
import { shallow, mount } from 'enzyme';
import Content from './Content';

describe('<Content />', () => {
  it('renders component without crashing', () => {
    const wrapper = shallow(<Content />);

    expect(wrapper).toBeDefined();
    expect(wrapper.hasClass('content')).toEqual(true);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('content should display add currency button', () => {
    const wrapper = shallow(<Content />, { context: { baseRate: 'USD' } });
    wrapper.unmount();
  });
});
