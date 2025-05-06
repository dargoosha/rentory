const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

router.get('/', userController.findAll);
router.post('/create',  userController.create);
router.get('/:IdClient', userController.findById);
router.post('/put/:IdClient', userController.update);
router.get('/delete/:IdClient', userController.delete);

module.exports = router;