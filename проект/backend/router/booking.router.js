const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking.controller.js');

router.get('/', bookingController.findAll);
router.post('/', bookingController.create);
router.get('/:IdBooking', bookingController.findById);
router.put('/:IdBooking', bookingController.update);
router.delete('/:IdBooking', bookingController.delete);

module.exports = router;