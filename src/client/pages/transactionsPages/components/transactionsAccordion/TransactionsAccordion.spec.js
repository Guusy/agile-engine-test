import React from 'react';
import { shallow } from 'enzyme';
import TransactionsAccordion from './TransactionsAccordion';

const props = { transactions: [] };
const setup = (anotherProps = {}) => {
  const newProps = {
    ...props,
    ...anotherProps,
  };
  const wrapper = shallow(<TransactionsAccordion {...newProps} />);

  return {
    wrapper,
    instance: wrapper.instance(),
    TransactionPanel: wrapper.find('TransactionPanel'),
    emptyMessage: wrapper.find('.empty-message'),
  };
};

describe('<Component />', () => {
  it('smoke test', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
  describe('when pass transactions', () => {
    const { TransactionPanel } = setup({
      transactions: [
        {
          id: 1,

        }, {
          id: 2
        }
      ]
    });

    it('render this TransactionPanel', () => {
      expect(TransactionPanel).toHaveLength(2);
    });

  });
  describe('when pass empty transactions', () => {
    const { emptyMessage } = setup({ transactions: [] })

    it('render empty message with the label "Sorry, there is no transaction yet"', () => {
      expect(emptyMessage.text()).toEqual("Sorry, there is no transaction yet")
    })
  })
});
