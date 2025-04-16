const Size = require("../model/size.model.js");

exports.findAll = function (req, res) {
    Size.findAll(function (err, size) {
        if (err) {
            res.status(500).send(err);
        } else res.send(size);
    });
}

exports.create = function (req, res) {
    const new_size = new Size(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Size.create(new_size, function (err, size) {
            if (err) {
                res.send(err);
            }
            res.json({ error: false, message: "Size added successfully!", data: size });
        });
    }
}

exports.findById = function (req, res) {
    Size.findById(req.params.IdSize, function (err, size) { 
        if (err) {
            res.send(err);
        } else {
            res.json(size);
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Size.update(req.params.IdSize, new Size(req.body), function (err, size) {
            if (err) {
                res.send(err);
            } else {
                res.json({ error: false, message: "Size updated successfully!" });
            }
        });
    }
}

exports.delete = function (req, res) {
    Size.delete(req.params.IdSize, function (err, size) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: "Size deleted successfully!" });
        }
    });
}

