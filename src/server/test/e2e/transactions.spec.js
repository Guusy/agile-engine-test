const request = require('supertest')
const app = require('../../index');
const { TransactionsRepository } = require('../../repositories/TransactionsRepository')
const { Transaction } = require('../../domain/Transaction')
const { CREDIT } = require('../../utils/constants')

describe('transactions endpoints', () => {
    describe('when do a post at /transactions', () => {
        describe('and has enough balance', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
                TransactionsRepository.balance = 100;
            })
            describe('and has a invalid amount', () => {
                it('response with 400 and message "invalid amount"', () => {
                    return request(app)
                        .post('/api/transactions')
                        .send({ amount: "213u123", type: CREDIT })
                        .expect(400)
                        .then((res) => {
                            expect(res.body.message).toEqual("Invalid amount")
                        })
                })
            })
            describe('and has a invalid TYPE', () => {
                it('response with 400 and message "invalid type"', () => {
                    return request(app)
                        .post('/api/transactions')
                        .send({ amount: 20, type: "another type" })
                        .expect(400)
                        .then((res) => {
                            expect(res.body.message).toEqual("Invalid type")
                        })
                })
            })
            describe('and has a valid amount and type', () => {
                it('response with 201 and the transaction ', () => {
                    return request(app)
                        .post('/api/transactions')
                        .send({ amount: 20, type: CREDIT })
                        .expect(201)
                        .then((res) => {
                            expect(res.body.amount).toEqual(20);
                            expect(res.body.type).toEqual(CREDIT);
                        })
                })
            })
        })

        describe('and hasnt enough balance', () => {
            beforeAll(() => {
                TransactionsRepository.reset();
                TransactionsRepository.balance = 0;
            })
            it('response with 400 and message "Not enough balance to do this transaction"', () => {
                return request(app)
                    .post('/api/transactions')
                    .send({ amount: 20, type: CREDIT })
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toEqual("Not enough balance to do this transaction")
                    })
            })
        })

    });

    describe('when do a get at /transactions/:id', () => {

        describe('and this transaction exists', () => {
            const transaction = Transaction.fromJson({ id: "20", amount: 40, type: CREDIT, effectiveDate: '' })
            beforeAll(() => {
                TransactionsRepository.transactions = [transaction]
            })
            it('respond with 200 and correct body', () => request(app)
                .get('/api/transactions/20')
                .expect(200)
                .then((res) => {
                    expect(res.body).toEqual(transaction)
                })
            )
        })

        describe('and this transaction doesnt exists', () => {
            it('respond with 404', () => request(app)
                .get('/api/transactions/40')
                .expect(404)
            )
        })

        describe('and transaction id is invalid ', () => {
            it('respond with 400 ', () => request(app)
                .get('/api/transactions/--2,31o20')
                .expect(400)
            )
        })
    })
})
