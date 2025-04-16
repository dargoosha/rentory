const express = require('express');
const router = express.Router();
const cityController = require('../controller/city.controller.js');

router.get('/', cityController.findAll);
router.post('/', cityController.create);
router.get('/:IdCity', cityController.findById);
router.put('/:IdCity', cityController.update);
router.delete('/:IdCity', cityController.delete);

module.exports = router;