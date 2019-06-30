import React from 'react';
import { shallow } from 'enzyme';
import TransactionPanel from './TransactionPanel';

const props = { handleChange: () => { } };
const setup = (anotherProps = {}) => {
    const newProps = {
        ...props,
        ...anotherProps,
    };
    const wrapper = shallow(<TransactionPanel {...newProps} />);

    return {
        wrapper,
        instance: wrapper.instance(),
        ExpansionPanel: wrapper.find('ExpansionPanel'),
        amount: wrapper.find('[data-test="amount"]'),
        type: wrapper.find('[data-test="type"]'),
    };
};

describe('<TransactionPanel />', () => {
    it('smoke test', () => {
        const { wrapper } = setup();
        expect(wrapper.exists()).toBe(true);
    });
    describe('basic render', () => {
        const { amount, type } = setup({ amount: 20, type: "credit" });

        it('render amount', () => {
            expect(amount.text()).toEqual("20")
        })
        it('render type', () => {
            expect(type.text()).toEqual("credit")
        })
    })

    describe('when expandend is equal to id', () => {
        const { wrapper } = setup({ id: 1, expanded: 1 })
        it('ExpansionPanel is open', () => {
            expect(wrapper.props().expanded).toBe(true)
        })
    })
    describe('when expandend is not equal to id', () => {
        const { wrapper } = setup({ id: 30, expanded: 1 })
        it('ExpansionPanel is open', () => {
            expect(wrapper.props().expanded).toBe(false)
        })
    })
    describe('when click in ExpansionPanel', () => {
        const handleChangeSpy = jest.fn()
        const isExpandedValue = true
        const id = 1;
        const { wrapper } = setup({ handleChange: handleChangeSpy, id, expanded: id })
        beforeAll(() => {
            wrapper.simulate('change', { target: { value: "" } }, isExpandedValue);
        });
        it('call handleChange with transaction id', () => {
            expect(handleChangeSpy).toBeCalledWith(id, isExpandedValue);
        });
    })
});
