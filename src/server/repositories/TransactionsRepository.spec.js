const { TransactionsRepository } = require('./TransactionsRepository')
describe('TransactionsRepository', () => {
    describe('when add a new transaction', () => {
        const transactionValue = {}
        beforeAll(() => {
            TransactionsRepository.reset();
            TransactionsRepository.add(transactionValue);
        })
        it('add this transaction to te repository', () => {
            expect(TransactionsRepository.transactions.length).toBe(1)
        });
    })

});