const Movie = require('../models/Movie');

const MovieController = {
  create: async (req, res) => {
    try {
      const { title, year, director_id } = req.body;
      if (!title || !director_id) return res.status(400).json({ error: 'Título e diretor são obrigatórios' });
      const movie = await Movie.create(title, year, director_id);
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const movies = await Movie.findAll();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) return res.status(404).json({ error: 'Filme não encontrado' });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, year, director_id } = req.body;
      if (!title || !director_id) return res.status(400).json({ error: 'Título e diretor são obrigatórios' });
      const updated = await Movie.update(id, title, year, director_id);
      if (!updated) return res.status(404).json({ error: 'Filme não encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Movie.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = MovieController; 