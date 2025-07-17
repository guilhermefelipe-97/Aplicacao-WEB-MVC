const Director = require('../models/Director');

const DirectorController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });
      const director = await Director.create(name);
      res.status(201).json(director);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const directors = await Director.findAll();
      res.json(directors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const director = await Director.findById(id);
      if (!director) return res.status(404).json({ error: 'Diretor não encontrado' });
      res.json(director);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });
      const updated = await Director.update(id, name);
      if (!updated) return res.status(404).json({ error: 'Diretor não encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Director.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = DirectorController; 