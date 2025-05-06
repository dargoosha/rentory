const Temperature = require('../model/temperature.model.js');

exports.findAll = function (req, res) {
    Temperature.findAll(function (err, temperature) {
        if (err) {
            res.status(500).send(err);
        } else res.render('temperature.ejs', { temperatures: temperature });
    });
}

exports.create = function (req, res) {
    const new_temperature = new Temperature(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Temperature.create(new_temperature, function (err, temperature) {
            if (err) {
                res.send(err);
            }
            res.redirect('/temperature');
        });
    }
}

exports.findById = function (req, res) {
    Temperature.findById(req.params.IdTemperature, function (err, temperature) {
        if (err) {
            res.send(err);
        } else {
            res.render('temperature_edit.ejs', { temperature: temperature });
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Temperature.update(req.params.IdTemperature, new Temperature(req.body), function (err, temperature) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/temperature');
            }
        });
    }
}

exports.delete = function (req, res) {
    Temperature.delete(req.params.IdTemperature, function (err, temperature) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect('/temperature');
        }
    });
}