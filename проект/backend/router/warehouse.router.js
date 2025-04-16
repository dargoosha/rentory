const express = require('express');
const router = express.Router();
const warehouseController = require('../controller/warehouse.controller.js');

router.get('/', warehouseController.findAll);
router.post('/', warehouseController.create);
router.get('/:IdWarehouse', warehouseController.findById);
router.put('/:IdWarehouse', warehouseController.update);
router.delete('/:IdWarehouse', warehouseController.delete);

module.exports = router;