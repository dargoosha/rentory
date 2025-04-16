const express = require('express');
const router = express.Router();
const temperatureController = require('../controller/temperature.controller.js');

router.get('/', temperatureController.findAll);
router.post('/', temperatureController.create);
router.get('/:IdTemperature', temperatureController.findById);
router.put('/:IdTemperature', temperatureController.update);
router.delete('/:IdTemperature', temperatureController.delete);

module.exports = router;