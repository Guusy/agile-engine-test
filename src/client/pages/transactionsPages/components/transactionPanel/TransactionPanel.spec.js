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
        effectiveDate: wrapper.find('.effective-date'),
        CreditCardIcon: wrapper.find('CreditCardIcon'),
        DebitIcon: wrapper.find('AttachMoneyIcon'),
        typeDetail: wrapper.find('.type-detail'),
        amountDetail: wrapper.find('.amount-detail'),
        idDetail: wrapper.find('.id-detail'),
    };
};

describe('<TransactionPanel />', () => {
    it('smoke test', () => {
        const { wrapper } = setup();
        expect(wrapper.exists()).toBe(true);
    });
  
    describe('when the type is credit ', () => {
        const { CreditCardIcon, amount } = setup({ amount: 20, type: "credit" });
        it('render a credit card icon', () => {
            expect(CreditCardIcon).toHaveLength(1)
        })
        it('render + amount', () => {
            expect(amount.text()).toEqual("+ 20")
        })
    })
    describe('when the type is debit ', () => {
        const { DebitIcon, amount } = setup({ amount: 20, type: "debit" });
        it('render a debit icon', () => {
            expect(DebitIcon).toHaveLength(1)
        })
        it('render - amount', () => {
            expect(amount.text()).toEqual("- 20")
        })
    })

    describe('when expandend is equal to id', () => {
        const effectiveDateValue = "23:20:20"
        const typeValue = "credit"
        const basicProps = { id: 1, expanded: 1, amount:20,effectiveDate: effectiveDateValue, type: typeValue}
        const { wrapper, typeDetail, effectiveDate,idDetail,amountDetail } = setup(basicProps)
        it('ExpansionPanel is open', () => {
            expect(wrapper.props().expanded).toBe(true)
        })
        it('render type', () => {
            expect(typeDetail.text()).toEqual(typeValue)
        });
        it('render effectiveDate', () => {
            expect(effectiveDate.text()).toEqual(effectiveDateValue)
        });
        
        it('render id', () => {
            expect(idDetail.text()).toEqual("1")
        });
        describe('and type is debit',()=>{
            const { amountDetail: amountDetailDebit } = setup({ ...basicProps, type: "debit" })
            it('render amount detail with -', () => {
                expect(amountDetailDebit.text()).toEqual("- 20")
            });
        })
        describe('and type is credit',()=>{
            const { amountDetail: amountDetailCredit } = setup({ ...basicProps, type: "credit" })
            it('render amount detail with +', () => {
                expect(amountDetailCredit.text()).toEqual("+ 20")
            });
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
