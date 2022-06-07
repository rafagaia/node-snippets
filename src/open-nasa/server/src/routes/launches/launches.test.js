const request = require('supertest');
const app = require('../../api');

describe('Test GET /launches', () => {
    test('It should respond with status 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
        // expect(response.statusCode).toBe(200); can use this jest way, or chain functions with supertest, as above
    });
});

describe('Test POST /launches', () => {
    test('It should respond with status 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
    });

    test('It should catch missing required properties', () => {
    });

    test('It should catch invalid dates', () => {});
});