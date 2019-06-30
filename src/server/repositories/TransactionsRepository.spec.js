const { TransactionsRepository } = require('./TransactionsRepository')
const { TransactionBody } = require('../domain/TransactionBody')
const { CREDIT, DEBIT } = require('../utils/constants')

const mockedDate = new Date(2017, 11, 10)
global.Date = jest.fn(() => mockedDate)

describe('TransactionsRepository', () => {
    describe('when ask for all transactions', () => {
        it('response with this transactions', async () => {
            const allTransactions = await TransactionsRepository.getAll();
            expect(allTransactions).toEqual([])
        })
    })

    describe('when add a new CREDIT transaction', () => {
        const transactionValue = TransactionBody.fromJson({
            amount: 10,
            type: CREDIT
        })
        let transactions = [];
        let transaction = {};
        beforeAll(async () => {
            TransactionsRepository.reset();
            TransactionsRepository.balance = 310;
            transaction = await TransactionsRepository.add(transactionValue);
            transactions = await TransactionsRepository.getAll();
        })
        it('add this to the repository', () => {
            expect(transactions.length).toBe(1);
        });
        it('add this with id', () => {
            expect(transaction.id).toBe(0);
        });
        it('add this with effectiveDate', () => {
            expect(transaction.effectiveDate).toEqual(mockedDate);
        });
        it('add this with his amount', () => {
            expect(transaction.amount).toEqual(transactionValue.amount);
        });
        it('add this with his type', () => {
            expect(transaction.type).toEqual(transactionValue.type);
        });
        it('add balance', () => {
            expect(TransactionsRepository.getBalance()).toEqual(320)
        })
    })
    describe('when add a new DEBIT transaction', () => {
        const transactionValue = TransactionBody.fromJson({
            amount: 10,
            type: DEBIT
        })
        let transactions = [];
        let transaction = {};
        beforeAll(async () => {
            TransactionsRepository.reset();
            TransactionsRepository.balance = 310;
            transaction = await TransactionsRepository.add(transactionValue);
            transactions = await TransactionsRepository.getAll();
        })
        it('add this to the repository', () => {
            expect(transactions.length).toBe(1);
        });
        it('add this with id', () => {
            expect(transaction.id).toBe(0);
        });
        it('add this with effectiveDate', () => {
            expect(transaction.effectiveDate).toEqual(mockedDate);
        });
        it('add this with his amount', () => {
            expect(transaction.amount).toEqual(transactionValue.amount);
        });
        it('add this with his type', () => {
            expect(transaction.type).toEqual(transactionValue.type);
        });
        it('subtract balance', () => {
            expect(TransactionsRepository.getBalance()).toEqual(300)
        })
    })

    describe('when ask for specific id', () => {
        describe('and this id exists', () => {
            const transactionValue = TransactionBody.fromJson({
                amount: 10,
                type: CREDIT
            })
            let transaction = {}
            beforeAll(async () => {
                TransactionsRepository.reset();
                await TransactionsRepository.add(transactionValue);
                transaction = await TransactionsRepository.getById(0)
            });
            it('return this transaction', () => {
                expect(transaction.id).toBe(0)
            });
        });
        describe('and this id doesnt exists', () => {
            let transaction;
            beforeAll(async () => {
                TransactionsRepository.reset();
                transaction = await TransactionsRepository.getById(45);
            });
            it('return undefined', () => {
                expect(transaction).toBe(undefined);
            });
        });
    })

    describe('when ask for balance', () => {
        beforeAll(() => {
            TransactionsRepository.balance = 9999
        })
        it('responds the actual balance', () => {
            expect(TransactionsRepository.getBalance()).toEqual(9999)
        })
    })

});