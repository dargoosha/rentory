const WarehouseType = require('../model/warehousetype.model');

exports.findAll = function (req, res) {
    WarehouseType.findAll(function (err, warehousetype) {
        if (err) {
            res.status(500).send(err);
        } else res.render('warehousetype.ejs', { warehousetypes: warehousetype });
    });
}

exports.create = function (req, res) {
    const new_warehousetype = new WarehouseType(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        WarehouseType.create(new_warehousetype, function (err, warehousetype) {
            if (err) {
                res.send(err);
            }
            res.redirect('/warehousetype');
        });
    }
}

exports.findById = function (req, res) {
    WarehouseType.findById(req.params.IdWarehouseType, function (err, warehousetype) {
        if (err) {
            res.send(err);
        } else {
            res.render('warehousetype_edit.ejs', { warehousetype: warehousetype });
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        WarehouseType.update(req.params.IdWarehouseType, new WarehouseType(req.body), function (err, warehousetype) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/warehousetype');
            }
        });
    }
}

exports.delete = function (req, res) {
    WarehouseType.delete(req.params.IdWarehouseType, function (err, warehousetype) {
        if (err) {
            res.send(err);
        }
        else {
            res.redirect('/warehousetype');
        }
    });
}


