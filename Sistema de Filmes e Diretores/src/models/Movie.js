const pool = require('../database/database');

const Movie = {
  create: async (title, year, director_id) => {
    const result = await pool.query('INSERT INTO movies (title, year, director_id) VALUES ($1, $2, $3) RETURNING *', [title, year, director_id]);
    return result.rows[0];
  },
  findAll: async () => {
    const result = await pool.query('SELECT movies.*, directors.name as director_name FROM movies LEFT JOIN directors ON movies.director_id = directors.id');
    return result.rows;
  },
  findById: async (id) => {
    const result = await pool.query('SELECT movies.*, directors.name as director_name FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE movies.id = $1', [id]);
    return result.rows[0];
  },
  update: async (id, title, year, director_id) => {
    const result = await pool.query('UPDATE movies SET title = $1, year = $2, director_id = $3 WHERE id = $4 RETURNING *', [title, year, director_id, id]);
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM movies WHERE id = $1', [id]);
  }
};

module.exports = Movie; 