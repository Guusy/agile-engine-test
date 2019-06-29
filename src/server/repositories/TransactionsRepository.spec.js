const { TransactionsRepository } = require('./TransactionsRepository')
const { TransactionBody } = require('../domain/TransactionBody')
const { CREDIT } = require('../utils/constants')
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
        const transactionValue = TransactionBody.fromJson({
            amount: 10,
            type: CREDIT
        })
        let transactions = [];
        let transaction = {};
        beforeAll(() => {
            TransactionsRepository.reset();
            TransactionsRepository.add(transactionValue);
            transactions = TransactionsRepository.getAll();
            transaction = transactions[0]
        })
        it('add this to the repository', () => {
            expect(transactions.length).toBe(1);
        });
        it('add this with id', () => {
            expect(transaction.id).toBe(0);
        });
        it('add this with effectiveDate', () => {
            expect(transaction.effectiveDate).toEqual(now);
        });
        it('add this with his amount', () => {
            expect(transaction.amount).toEqual(transactionValue.amount);
        });
        it('add this with his type', () => {
            expect(transaction.type).toEqual(transactionValue.type);
        });
    })

    describe('when ask for specific id', () => {
        describe('and this id exists', () => {
            const transactionValue = TransactionBody.fromJson({
                amount: 10,
                type: CREDIT
            })
            let transaction = {}
            beforeAll(() => {
                TransactionsRepository.reset();
                TransactionsRepository.add(transactionValue);
                transaction = TransactionsRepository.getById(0)
            });
            it('return this transaction', () => {
                expect(transaction.id).toBe(0)
            });
        });
        describe('and this id doesnt exists', () => {
            let transaction;
            beforeAll(() => {
                TransactionsRepository.reset();
                transaction = TransactionsRepository.getById(45);
            });
            it('return undefined', () => {
                expect(transaction).toBe(undefined);
            });
        });
    })

});