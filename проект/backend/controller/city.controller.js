const City = require("../model/city.model.js");

exports.findAll = function (req, res) {
    Booking.findAll(function(err, booking) {
        if (err) {
            res.status(500).send(err);
        } else res.send(booking);
    });
}

exports.create = function (req, res) {
    const new_city = new City(req.body);
    
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        City.create(new_city, function (err, city) {
            if (err) {
                res.send(err);
            }
            res.json({ error: false, message: "City added successfully!", data: city });
        });
    }
}

exports.findById = function(req, res) {
    User.findById(req.params.IdClient, function(err, city){
        if (err) {
            res.send(err);
        } else {
            res.json(city);
        }
    });
}

exports.update = function(req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        City.update(req.params.IdCity, new City(req.body), function(err, city) {
            if (err) {
                res.send(err);
            } else {
                res.json({ error: false, message: "City updated successfully!" });
            }
        });
    }
}

exports.delete = function(req, res) {
    City.delete(req.params.IdCity, function(err, city) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: "City deleted successfully!" });
        }
    });
}


    


