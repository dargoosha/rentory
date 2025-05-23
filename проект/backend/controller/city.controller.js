const City = require("../model/city.model.js");

exports.findAll = function (req, res) {
    City.findAll(function(err, city) {
        if (err) {
            res.status(500).send(err);
        } else res.render('city.ejs', { city: city });
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
            res.redirect('/city');
        });
    }
}

exports.findById = function(req, res) {
    User.findById(req.params.IdClient, function(err, city){
        if (err) {
            res.send(err);
        } else {
            res.render('city_edit.ejs', { city: city });
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
                res.redirect('/city');
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
            res.redirect('/city');
        }
    });
}


    


