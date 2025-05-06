const express = require('express');
const router = express.Router();
const sizeController = require('../controller/size.controller.js');

router.get('/', sizeController.findAll);
router.post('/create', sizeController.create);
router.get('/:IdSize',  sizeController.findById);
router.post('/put/:IdSize', sizeController.update);
router.get('/delete/:IdSize', sizeController.delete);

module.exports = router;