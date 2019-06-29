const request = require('supertest')
const app = require('../../index');

describe('when do a get at /ping', () => {
    it('respond pong', () => request(app)
        .get('/api/ping')
        .expect(200)
        .then((res) => {
            expect(res.body.message).toEqual('pong')
        }))
})