var connection = require('../config/config.bd.js');

var Booking = function (booking) {
    this.IdBooking = booking.IdBooking;
    this.IdWarehouse = booking.IdWarehouse;
    this.IdClient = booking.IdClient;
    this.StartDate = booking.StartDate;
    this.EndDate = booking.EndDate;
    this.BookingStatus = booking.BookingStatus;
    this.Prise = booking.Prise;
    this.PaymentStatus = booking.PaymentStatus;
}

Booking.create = function (newBooking, result) {
    connection.query("INSERT INTO Booking set ?", newBooking, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

Booking.findById = function (IdBooking, result) {
    connection.query("SELECT * FROM Booking WHERE IdBooking = ?", IdBooking, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Booking.findAll = function (result) {
    connection.query("SELECT * FROM Booking", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("Booking: ", res);
                result(null, res);
            }
        });
}

Booking.update = function (IdBooking, booking, result) {
    connection.query("UPDATE Booking SET IdWarehouse = ?, IdClient = ?, StartDate = ?, EndDate = ?, BookingStatus = ?, Prise = ?, PaymentStatus = ? WHERE IdBooking = ?", 
        [booking.IdWarehouse, booking.IdClient, booking.StartDate, booking.EndDate, booking.BookingStatus, booking.Prise, booking.PaymentStatus, IdBooking], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " Booking updated");
                result(null, res);
            }
        });
}

Booking.delete = function (IdBooking, result) {
    connection.query("DELETE FROM Booking WHERE IdBooking = ?", IdBooking, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res.affectedRows + " Booking deleted");
            result(null, res);
        }
    });
}

module.exports = Booking;