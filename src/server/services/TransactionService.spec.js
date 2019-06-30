const { TransactionService } = require('./TransactionService')
const { TransactionBody } = require('../domain/TransactionBody');
const { Transaction } = require('../domain/Transaction');
const { TransactionsRepository } = require('../repositories/TransactionsRepository');


const { CREDIT, DEBIT } = require('../utils/constants')
const { NotEnoughBalanceException, TransactionNotFoundException, InvalidTransactionId, InvalidTypeException } = require('../errors')

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
            it('add a transaction', async () => {
                const transactions = await TransactionsRepository.getAll();
                const transaction = transactions[0]
                expect(transaction.amount).toEqual(20)
                expect(transaction.type).toEqual(CREDIT)
            })
        })

        describe('and has a invalid type', () => {
            const transaction = TransactionBody.fromJson({ amount: 20, type: "12312312" });
            beforeAll(() => {
                TransactionsRepository.balance = 100;
            })
            it('throws InvalidTypeException', async () => {
                const addTransaction = () => {
                    return TransactionService.add(transaction)
                }
                expect(addTransaction()).rejects.toEqual(InvalidTypeException())
                expect(TransactionsRepository.balance).toEqual(100)

            });
        })

        describe('and this has amount that makes the balance remain negative', () => {
            const transaction = TransactionBody.fromJson({ amount: 999999, type: CREDIT });
            beforeAll(() => {
                TransactionsRepository.balance = 100;
            })
            it('throws NoEnoughBalanceException', async () => {
                const addTransaction = async () => {
                    return await TransactionService.add(transaction)
                }
                expect(addTransaction()).rejects.toEqual(NotEnoughBalanceException())
                expect(TransactionsRepository.balance).toEqual(100)
            });
        })
    });

    describe('when want to search a transaction by id', () => {
        describe('and this exists', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
                TransactionsRepository.transactions = [Transaction.fromJson({ id: 32, amount: 20, type: CREDIT })]
            });
            it('response with the transaction', async () => {
                const transaction = await TransactionService.getById(32);
                expect(transaction.id).toEqual(32);
            });
        });
        describe('and this doesnt exists', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
            });
            it('throw TransactionNotFoundException', () => {
                const findTransaction = async () => {
                    return await TransactionService.getById(80);
                }
                expect(findTransaction()).rejects.toEqual(TransactionNotFoundException())
            });
        });
        describe('and the id has a invalid value ', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
            });
            it('throw InvalidTransactionId', () => {
                const findTransaction = async () => {
                    return await TransactionService.getById('s,dapsmop.,aslmomi');
                }
                expect(findTransaction()).rejects.toEqual(InvalidTransactionId())
            });
        });
    });

    describe('when the repository execute a transaction of read', () => {
        describe('and try to do a getAll()', () => {
            beforeAll(() => {
                TransactionsRepository.reset()
                TransactionsRepository.balance = 1000000
                const copyFunction = TransactionsRepository.add
                TransactionsRepository.add = (transaction) => new Promise((res) => {
                    setTimeout(() => {
                        const thisTransaction = copyFunction({ ...transaction })
                        res(thisTransaction);
                    }, 500)
                })
            })
            it('wait for the read transaction finish', () => {
                const transaction = TransactionBody.fromJson({ amount: 20, type: CREDIT });
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)

                return TransactionService.getAll()
                    .then((response) => {
                        const [firstTransaction, secondTransaction, thirdTransaction] = response
                        expect(TransactionService.queue).toEqual([])
                        expect(firstTransaction.id).toEqual(0)
                        expect(firstTransaction.amount).toEqual(20)
                        expect(firstTransaction.type).toEqual(CREDIT)
                        expect(secondTransaction.id).toEqual(1)
                        expect(secondTransaction.amount).toEqual(20)
                        expect(secondTransaction.type).toEqual(CREDIT)
                        expect(thirdTransaction.id).toEqual(2)
                        expect(thirdTransaction.amount).toEqual(20)
                        expect(thirdTransaction.type).toEqual(CREDIT)
                    })
            })
        })
        describe('and try to do a getById()', () => {
            beforeAll(() => {
                TransactionsRepository.reset()
                TransactionsRepository.balance = 1000000
                const copyFunction = TransactionsRepository.add
                TransactionsRepository.add = (transaction) => new Promise((res) => {
                    setTimeout(() => {
                        const thisTransaction = copyFunction({ ...transaction })
                        res(thisTransaction);
                    }, 200)
                })
            })
            it('wait for the read transaction finish', () => {
                const transaction = TransactionBody.fromJson({ amount: 10, type: DEBIT });
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)

                return TransactionService.getById(2)
                    .then((response) => {
                        expect(TransactionService.queue).toEqual([])
                        expect(response.id).toEqual(2)
                        expect(response.amount).toEqual(10)
                        expect(response.type).toEqual(DEBIT)
                    })
            })
        })

        describe('and try to do a add()', () => {
            beforeAll(() => {
                TransactionsRepository.reset()
                TransactionsRepository.balance = 1000000
                const copyFunction = TransactionsRepository.add
                TransactionsRepository.add = (transaction) => new Promise((res) => {
                    setTimeout(() => {
                        const thisTransaction = copyFunction({ ...transaction })
                        res(thisTransaction);
                    }, 200)
                })
            })
            it('wait for the read transaction finish', () => {
                const transaction = TransactionBody.fromJson({ amount: 10, type: DEBIT });
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)
                TransactionService.add(transaction)

                return TransactionService.add(TransactionBody.fromJson({ amount: 40, type: CREDIT }))
                    .then((response) => {
                        const first = TransactionsRepository.transactions[0]
                        expect(TransactionService.queue).toEqual([])
                        expect(first.id).toEqual(0)
                        expect(first.amount).toEqual(10)
                        expect(first.type).toEqual(DEBIT)
                        expect(response.id).toEqual(7)
                        expect(response.amount).toEqual(40)
                        expect(response.type).toEqual(CREDIT)
                    })
            })
        })
    })

})