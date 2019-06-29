const { TransactionsRepository } = require('./TransactionsRepository')
const now = Date.now()
Date.now = jest.fn(() => now);

describe('TransactionsRepository', () => {

    describe('when ask for all transactions', () => {
        it('response with this transactions', () => {
            const allTransactions = TransactionsRepository.getAll();
            expect(allTransactions).toEqual([])
        })
    })
    describe('when add a new transaction', () => {
        const transactionValue = {}
        let transactions = [];
        beforeAll(() => {
            TransactionsRepository.reset();
            TransactionsRepository.add(transactionValue);
            transactions = TransactionsRepository.getAll();
        })
        it('add this transaction to te repository', () => {
            expect(transactions.length).toBe(1);
        });
        it('insert this with id', () => {
            expect(transactions[0].id).toBe(0);
        });
        it('add to this transaction the effectiveDate', () => {
            expect(transactions[0].effectiveDate).toEqual(now);
        });
    })

});