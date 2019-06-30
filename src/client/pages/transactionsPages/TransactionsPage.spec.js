import React from 'react';
import { shallow, mount } from 'enzyme';
import TransactionsPage from './TransactionsPage';
import TransactionService from '../../services/TransactionsService';

jest.mock('../../services/TransactionsService', () => (
    class {
        static getAll() {
            return [1, 2, 3, 4]
        }
    }
))
const props = {};
const setup = (anotherProps = {}) => {
    const newProps = {
        ...props,
        ...anotherProps,
    };
    const wrapper = mount(<TransactionsPage {...newProps} />);

    return {
        wrapper,
        instance: wrapper.instance(),
        TransactionsAccordion: wrapper.find('TransactionsAccordion'),
    };
};

describe('<TransactionsPage />', () => {
    const { wrapper, TransactionsAccordion } = setup();
    beforeAll(() => {
        const mockStaticF = jest.fn();
        mockStaticF.mockReturnValue('worked');

        TransactionService.getAll = mockStaticF.bind(TransactionService);

    })
    it('smoke test', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('render a TransactionsAccordion', () => {
        expect(TransactionsAccordion).toHaveLength(1);
    });
    it('pass all the transactions to the TransactionsAccordion', (done) => {
        wrapper.update();
        const TransactionsAccordionMounted = wrapper.find('TransactionsAccordion');
        expect(TransactionsAccordionMounted.props().transactions).toEqual([1, 2, 3, 4]);
        done();
    })
});
