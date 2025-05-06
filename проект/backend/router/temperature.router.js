const express = require('express');
const router = express.Router();
const temperatureController = require('../controller/temperature.controller.js');

router.get('/', temperatureController.findAll);
router.post('/create', temperatureController.create);
router.get('/:IdTemperature', temperatureController.findById);
router.post('/put/:IdTemperature', temperatureController.update);
router.get('/delete/:IdTemperature', temperatureController.delete);

module.exports = router;