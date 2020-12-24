const request = require('supertest');
const app = require('../app');

describe('Path', () => {
    test('GET response', done => {
        request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('GET response text', done => {
        request(app).get('/').then(response => {
            expect(response.text).toMatch(/Welcome/);
            done();
        })
    });

    test('POST response = error', done => {
        request(app).post('/').then(response => {
            expect(response.statusCode).toBe(404);
            expect(response.statusCode).not.toBe(200);
            done();
        })
    })
});