const { TransactionService } = require('./TransactionService')
const { TransactionBody } = require('../domain/TransactionBody');
const { Transaction } = require('../domain/Transaction');
const { TransactionsRepository } = require('../repositories/TransactionsRepository');


const { CREDIT } = require('../utils/constants')
const { InvalidAmountException, TransactionNotFoundException, InvalidTransactionId } = require('../errors')

describe('TransactionService', () => {
    describe('when want to add a transaction', () => {


        describe('and this has amount is valid', () => {
            beforeAll(() => {
                const transaction = TransactionBody.fromJson({ amount: 20, type: CREDIT });
                TransactionsRepository.reset();
                TransactionsRepository.balance = 100;
                TransactionService.add(transaction);
            })
            it('subtract this amount of balance ', () => {
                const balance = TransactionService.getBalance();
                expect(balance).toEqual(80)
            });
            it('add a transaction', () => {
                const transactions = TransactionsRepository.getAll();
                const transaction = transactions[0]
                expect(transaction.amount).toEqual(20)
                expect(transaction.type).toEqual(CREDIT)
            })
        })


        describe('and this has amount that makes the balance remain negative', () => {
            const transaction = TransactionBody.fromJson({ amount: 999999, type: CREDIT });
            beforeAll(() => {
                TransactionsRepository.balance = 100;
            })
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
        describe('and the id has a invalid value ', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
            });
            it('throw InvalidTransactionId', () => {
                const findTransaction = () => {
                    return TransactionService.getById('s,dapsmop.,aslmomi');
                }
                expect(findTransaction).toThrow(InvalidTransactionId());
            });
        });
    });

})