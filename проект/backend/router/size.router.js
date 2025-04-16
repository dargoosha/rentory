const express = require('express');
const router = express.Router();
const sizeController = require('../controller/size.controller.js');

router.get('/', sizeController.findAll);
router.post('/', sizeController.create);
router.get('/:IdSize', sizeController.findById);
router.put('/:IdSize', sizeController.update);
router.delete('/:IdSize', sizeController.delete);

module.exports = router;