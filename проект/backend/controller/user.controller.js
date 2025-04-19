const User = require("../model/user.model.js");

exports.findAll = function (req, res) {
    User.findAll(function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else res.send(user);
    });
}

exports.create = function(req, res) {
    const new_user = new User(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        User.create(new_user, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ error: false, message: "User added successfully!" , data: user });
        });
    }
}

exports.findById = function(req, res) {
    User.findById(req.params.IdClient, function(err, user){
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
}

exports.update = function(req, res) {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please fill all fields" });
    }
    else {
        User.update(req.params.IdClient, new User(req.body), function(err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json({ error: false, message: "User updated successfully!" });
            }
        });
    }
}

exports.delete = function(req, res) {
    User.delete(req.params.IdClient, function(err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: "User deleted successfully!" });
        }
    });
}

