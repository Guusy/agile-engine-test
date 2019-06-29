const request = require('supertest')
const app = require('../../index');
const { TransactionsRepository } = require('../../repositories/TransactionsRepository')
const { Transaction } = require('../../domain/Transaction')
const { CREDIT } = require('../../utils/constants')
describe('transactions endpoints', () => {
    describe('when do a get at /transactions/:id', () => {

        describe('and this transaction doesnt exists', () => {
            it('respond with 404', () => request(app)
                .get('/api/transactions/40')
                .expect(404)
            )
        })
        describe('and this transaction exists', () => {
            const transaction = Transaction.fromJson({ id: "20", amount: 40, type: CREDIT })
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

    })
})
