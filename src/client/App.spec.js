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
    TransactionsPage: wrapper.find('TransactionsPage'),
  };
};

describe('<App />', () => {
  const { wrapper, TransactionsPage } = setup();

  it('smoke test', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('renders TransactionsPage', () => {
    expect(TransactionsPage).toHaveLength(1);
  });
});
