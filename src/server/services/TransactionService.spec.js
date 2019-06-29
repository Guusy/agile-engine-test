const { TransactionService } = require('./TransactionService')
const { TransactionBody } = require('../domain/TransactionBody');
const { Transaction } = require('../domain/Transaction');
const { TransactionsRepository } = require('../repositories/TransactionsRepository');


const { CREDIT } = require('../utils/constants')
const { InvalidAmountException, TransactionNotFoundException } = require('../errors')

describe('TransactionService', () => {
    describe('when want to add a transaction', () => {
        describe('and this has amount that makes the balance remain negative', () => {
            const transaction = TransactionBody.fromJson({ amount: 999999, type: CREDIT });
            it('throws InvalidAmountException', () => {
                const addTransaction = () => {
                    return TransactionService.add(transaction)
                }
                expect(addTransaction).toThrow(InvalidAmountException());
            });

        })
    });

    describe('when want to search a transaction by id', () => {
        describe('and this exists', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
                TransactionsRepository.transactions = [Transaction.fromJson({ id: 32, amount: 20, type: CREDIT })]
            });
            it('response with the transaction', () => {
                const transaction = TransactionService.getById(32);
                expect(transaction.id).toEqual(32);
            });
        });
        describe('and this doesnt exists', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
            });
            it('throw TransactionNotFoundException', () => {
                const findTransaction = () => {
                    return TransactionService.getById(80);
                }
                expect(findTransaction).toThrow(TransactionNotFoundException());
            });
        });
    });

})