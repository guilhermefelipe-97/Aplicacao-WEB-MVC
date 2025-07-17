const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Director = require('../models/Director');

// Listar filmes
router.get('/', async (req, res) => {
  const movies = await Movie.findAll();
  res.render('movies/index', { movies });
});

// Formulário de novo filme
router.get('/new', async (req, res) => {
  const directors = await Director.findAll();
  res.render('movies/new', { directors });
});

// Cadastrar novo filme
router.post('/new', async (req, res) => {
  const { title, year, director_id } = req.body;
  if (!title || !director_id) {
    const directors = await Director.findAll();
    return res.render('movies/new', { directors, error: 'Título e diretor são obrigatórios' });
  }
  await Movie.create(title, year, director_id);
  res.redirect('/movies');
});

module.exports = router; 