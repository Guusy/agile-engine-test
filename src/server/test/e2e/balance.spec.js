const request = require('supertest');
const app = require('../../index');
const { TransactionsRepository } = require('../../repositories/TransactionsRepository');

describe('when do a get at /', () => {
  it('respond with the actual balance', () => {
    TransactionsRepository.balance = 200;
    return request(app)
      .get('/api/')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ balance: 200 });
      });
  });
});
