const { TransactionsRepository } = require('./TransactionsRepository')
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
        it('inser this with id', () => {
            expect(transactions[0].id).toBe(0);
        });
    })

});