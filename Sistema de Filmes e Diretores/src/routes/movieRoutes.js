const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/MovieController');

router.post('/', MovieController.create);
router.get('/', MovieController.findAll);
router.get('/:id', MovieController.findById);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router; 