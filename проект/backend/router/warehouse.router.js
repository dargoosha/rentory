const express = require('express');
const router = express.Router();
const warehouseController = require('../controller/warehouse.controller.js');

router.get('/', warehouseController.findAll);
router.post('/create',  warehouseController.create);
router.get('/:IdWarehouse', warehouseController.findById);
router.post('/put/:IdWarehouse', warehouseController.update);
router.get('/delete/:IdWarehouse', warehouseController.delete);

module.exports = router;