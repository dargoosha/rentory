const Warehouse = require('../model/warehouse.model');

exports.findAll = function (req, res) {
    Warehouse.findAll(function (err, warehouse) {
        if (err) {
            res.status(500).send(err);
        } else res.send(warehouse);
    });
}

exports.create = function (req, res) {
    const new_warehouse = new Warehouse(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Warehouse.create(new_warehouse, function (err, warehouse) {
            if (err) {
                res.send(err);
            }
            res.json({ error: false, message: "Warehouse added successfully!", data: warehouse });
        });
    }
}

exports.findById = function (req, res) {
    Warehouse.findById(req.params.IdWarehouse, function (err, warehouse) {
        if (err) {
            res.send(err);
        } else {
            res.json(warehouse);
        }
    });
}

exports.update = function (req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        Warehouse.update(req.params.IdWarehouse, new Warehouse(req.body), function (err, warehouse) {
            if (err) {
                res.send(err);
            } else {
                res.json({ error: false, message: "Warehouse updated successfully!" });
            }
        });
    }
}

exports.delete = function (req, res) {
    Warehouse.delete(req.params.IdWarehouse, function (err, warehouse) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: "Warehouse deleted successfully!" });
        }
    });
}


