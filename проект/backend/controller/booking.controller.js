const Booking = require("../model/booking.model.js");

exports.findAll = function (req, res) {
    Booking.findAll(function (err, booking) {
        if (err){
            res.status(500).send(err);
        } else res.send(booking);
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
            res.json({ error: false, message: "Booking added successfully!", data: booking });
        });
    }
}

exports.findById = function (req, res) {
    Booking.findById(req.params.IdBooking, function (err, booking) {
        if (err) {
            res.send(err);
        } else {
            res.json(booking);
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Booking.update(req.params.IdBooking, new Booking(req.body), function (err, booking) {
            if (err) {
                res.send(err);
            } else {
                res.json({ error: false, message: "Booking updated successfully!" });
            }
        });
    }
}

exports.delete = function(req, res) {
    User.delete(req.params.IdBooking, function(err,booking) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: "Booking deleted successfully!" });
        }
    });
}
