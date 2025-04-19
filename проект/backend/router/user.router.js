const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

router.get('/', userController.findAll);
router.post('/', userController.create);
router.get('/:IdClient', userController.findById);
router.put('/:IdClient', userController.update);
router.delete('/:IdClient', userController.delete);

module.exports = router;