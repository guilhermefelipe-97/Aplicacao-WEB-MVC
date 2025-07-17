const request = require('supertest');
const app = require('../../app');
const pool = require('../../src/database/database');

describe('API Diretores', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(4001, done);
  });
  afterAll(async () => {
    await pool.query('DELETE FROM movies');
    await pool.query('DELETE FROM directors');
    await pool.end();
    server.close();
  });

  let diretorId;

  test('POST /api/directors - cria diretor', async () => {
    const res = await request(server)
      .post('/api/directors')
      .send({ name: 'Steven Spielberg' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Steven Spielberg');
    diretorId = res.body.id;
  });

  test('POST /api/directors - erro se nome vazio', async () => {
    const res = await request(server)
      .post('/api/directors')
      .send({ name: '' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/directors - lista diretores', async () => {
    const res = await request(server).get('/api/directors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/directors/:id - busca diretor por id', async () => {
    const res = await request(server).get(`/api/directors/${diretorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', diretorId);
  });

  test('GET /api/directors/:id - erro se id inexistente', async () => {
    const res = await request(server).get('/api/directors/99999');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/directors/:id - atualiza diretor', async () => {
    const res = await request(server)
      .put(`/api/directors/${diretorId}`)
      .send({ name: 'George Lucas' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('George Lucas');
  });

  test('PUT /api/directors/:id - erro se nome vazio', async () => {
    const res = await request(server)
      .put(`/api/directors/${diretorId}`)
      .send({ name: '' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/directors/:id - erro se id inexistente', async () => {
    const res = await request(server)
      .put('/api/directors/99999')
      .send({ name: 'Outro Nome' });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/directors/:id - remove diretor', async () => {
    const res = await request(server).delete(`/api/directors/${diretorId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /api/directors/:id - erro se id inexistente', async () => {
    const res = await request(server).delete('/api/directors/99999');
    expect(res.statusCode).toBe(204); // Mesmo se não existir, retorna 204
  });
}); 