const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

// Listar diretores
router.get('/', async (req, res) => {
  const directors = await Director.findAll();
  res.render('directors/index', { directors });
});

// Formulário de novo diretor
router.get('/new', (req, res) => {
  res.render('directors/new');
});

// Cadastrar novo diretor
router.post('/new', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.render('directors/new', { error: 'Nome é obrigatório' });
  }
  await Director.create(name);
  res.redirect('/directors');
});

module.exports = router; 