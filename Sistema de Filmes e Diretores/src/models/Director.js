const pool = require('../database/database');

const Director = {
  create: async (name) => {
    const result = await pool.query('INSERT INTO directors (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
  },
  findAll: async () => {
    const result = await pool.query('SELECT * FROM directors');
    return result.rows;
  },
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM directors WHERE id = $1', [id]);
    return result.rows[0];
  },
  update: async (id, name) => {
    const result = await pool.query('UPDATE directors SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM directors WHERE id = $1', [id]);
  }
};

module.exports = Director; 