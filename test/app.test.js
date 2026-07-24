const request = require('supertest');
const app = require('../app');

describe('Tests API', () => {

  test('GET /health retourne 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  test('GET / retourne 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.application).toBe('Pipeline CI/CD Kubernetes');
  });

  test('GET /info retourne 200', async () => {
    const res = await request(app).get('/info');
    expect(res.statusCode).toBe(200);
  });

});