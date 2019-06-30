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
    };
};

describe('<TransactionPanel />', () => {
    it('smoke test', () => {
        const { wrapper } = setup();
        expect(wrapper.exists()).toBe(true);
    });
});
