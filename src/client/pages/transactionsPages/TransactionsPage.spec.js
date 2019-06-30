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
        CircularProgress: wrapper.find('CircularProgress'),
    };
};

describe('<TransactionsPage />', () => {
    const { wrapper, CircularProgress } = setup();
    it('smoke test', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('when the api call finish', () => {
        beforeAll(()=>{
            wrapper.update();
        })
        it('pass all the transactions to the TransactionsAccordion', (done) => {
            const TransactionsAccordionMounted = wrapper.find('TransactionsAccordion');
            expect(TransactionsAccordionMounted.props().transactions).toEqual([1, 2, 3, 4]);
            done();
        });
    })


});
