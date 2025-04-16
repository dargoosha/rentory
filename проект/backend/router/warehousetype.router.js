const express = require('express');
const router = express.Router();
const warehousetypeController = require('../controller/warehousetype.controller.js');

router.get('/', warehousetypeController.findAll);
router.post('/', warehousetypeController.create);
router.get('/:IdWarehouseType', warehousetypeController.findById);
router.put('/:IdWarehouseType', warehousetypeController.update);
router.delete('/:IdWarehouseType', warehousetypeController.delete);

module.exports = router;