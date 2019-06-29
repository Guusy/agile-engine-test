import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const props = {};
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps,
  };
  const wrapper = shallow(<App {...newProps} />);

  return {
    wrapper,
    instance: wrapper.instance(),
  };
};

describe('<App />', () => {
  it('smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
