const { TransactionService } = require('./TransactionService')
const { TransactionBody } = require('../domain/TransactionBody')
const { CREDIT } = require('../utils/constants')
const { InvalidAmountException } = require('../errors')

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

    })
})