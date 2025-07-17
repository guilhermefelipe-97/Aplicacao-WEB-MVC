const express = require('express');
const router = express.Router();
const DirectorController = require('../controllers/DirectorController');

router.post('/', DirectorController.create);
router.get('/', DirectorController.findAll);
router.get('/:id', DirectorController.findById);
router.put('/:id', DirectorController.update);
router.delete('/:id', DirectorController.delete);

module.exports = router; 