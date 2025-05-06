const express = require('express');
const router = express.Router();
const cityController = require('../controller/city.controller');

router.get('/', cityController.findAll);
router.post('/create', cityController.create);
router.get('/:IdCity', cityController.findById);
router.post('/put/:IdCity', cityController.update);
router.get('/delete/:IdCity', cityController.delete);

module.exports = router;