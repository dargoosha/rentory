const Booking = require("../model/booking.model.js");

exports.findAll = function (req, res) {
    Booking.findAll(function (err, booking) {
        if (err){
            res.status(500).send(err);
        } else res.render('booking.ejs', { booking: booking });
    });
}

exports.create = function (req, res) {
    const new_booking = new Booking(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Booking.create(new_booking, function (err, booking) {
            if (err) {
                res.send(err);
            }
            res.redirect('/api/booking');
        });
    }
}

exports.findById = function (req, res) {
    Booking.findById(req.params.IdBooking, function (err, booking) {
        if (err) {
            res.status(500).send(err);
        } else if (!booking || booking.length === 0) {
            res.status(404).send({ error: true, message: "Booking not found" });
        } else {
            res.render('booking_edit.ejs', { booking: booking[0] }); // Беремо перший елемент, якщо повертається масив
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Booking.update(req.params.IdBooking, new Booking(req.body), function (err, booking) {
            if (err) 
                res.send(err);
            res.redirect('/api/booking');

        });
    }
}

exports.delete = function(req, res) {
    Booking.delete(req.params.IdBooking, function(err,booking) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect('/api/booking');
        }
    });
}
