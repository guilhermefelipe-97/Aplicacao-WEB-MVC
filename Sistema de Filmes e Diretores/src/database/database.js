const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Altere para seu usuário
  host: 'localhost',
  database: 'filmesdb', // Altere para o nome do seu banco
  password: 'sua_senha', // Altere para sua senha
  port: 5432,
});

// Criação das tabelas se não existirem
const createTables = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS directors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INTEGER,
    director_id INTEGER REFERENCES directors(id)
  )`);
};

createTables().catch(console.error);

module.exports = pool; 