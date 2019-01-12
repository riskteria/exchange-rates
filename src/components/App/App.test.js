import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders component without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.app')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
