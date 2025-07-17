const request = require('supertest');
const app = require('../../app');
const pool = require('../../src/database/database');

describe('API Filmes', () => {
  let server;
  let diretorId;
  let filmeId;
  beforeAll(async (done) => {
    server = app.listen(4002, done);
    // Cria um diretor para usar nos testes de filme
    const res = await request(server)
      .post('/api/directors')
      .send({ name: 'Christopher Nolan' });
    diretorId = res.body.id;
  });
  afterAll(async () => {
    await pool.query('DELETE FROM movies');
    await pool.query('DELETE FROM directors');
    await pool.end();
    server.close();
  });

  test('POST /api/movies - cria filme', async () => {
    const res = await request(server)
      .post('/api/movies')
      .send({ title: 'Inception', year: 2010, director_id: diretorId });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Inception');
    filmeId = res.body.id;
  });

  test('POST /api/movies - erro se título ou diretor ausente', async () => {
    const res = await request(server)
      .post('/api/movies')
      .send({ title: '', director_id: '' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/movies - lista filmes', async () => {
    const res = await request(server).get('/api/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/movies/:id - busca filme por id', async () => {
    const res = await request(server).get(`/api/movies/${filmeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', filmeId);
  });

  test('GET /api/movies/:id - erro se id inexistente', async () => {
    const res = await request(server).get('/api/movies/99999');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/movies/:id - atualiza filme', async () => {
    const res = await request(server)
      .put(`/api/movies/${filmeId}`)
      .send({ title: 'Interstellar', year: 2014, director_id: diretorId });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Interstellar');
  });

  test('PUT /api/movies/:id - erro se título ou diretor ausente', async () => {
    const res = await request(server)
      .put(`/api/movies/${filmeId}`)
      .send({ title: '', director_id: '' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/movies/:id - erro se id inexistente', async () => {
    const res = await request(server)
      .put('/api/movies/99999')
      .send({ title: 'Outro Filme', year: 2000, director_id: diretorId });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/movies/:id - remove filme', async () => {
    const res = await request(server).delete(`/api/movies/${filmeId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /api/movies/:id - erro se id inexistente', async () => {
    const res = await request(server).delete('/api/movies/99999');
    expect(res.statusCode).toBe(204); // Mesmo se não existir, retorna 204
  });
}); 