const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking.controller.js');

router.get('/', bookingController.findAll);
router.post('/create', bookingController.create);
router.get('/:IdBooking', bookingController.findById);
router.post('/put/:IdBooking', bookingController.update);
router.get('/delete/:IdBooking', bookingController.delete);

module.exports = router;