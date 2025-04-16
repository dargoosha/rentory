var connection = require('./../config/config.bd');

var User = function (user) {
    this.IdClient = user.IdClient;
    this.FullName = user.FullName;
    this.Email = user.Email;
    this.Phone = user.Phone;
}

User.create = function (newUser, result) {
    connection.query("INSERT INTO User set ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

User.findById = function (IdClient, result) {
    connection.query("SELECT * FROM User WHERE IdClient = ?", IdClient, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

User.findAll = function (result) {
    connection.query("SELECT * FROM user", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("User: ", res);
                result(null, res);
            }
        });
}

User.update = function (IdClient, user, result) {
    connection.query("UPDATE user SET FullName = ?, Email = ?, Phone = ? WHERE IdClient = ?", 
        [user.FullName, user.Email, user.Phone, IdClient], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " user updated");
                result(null, res);
            }
        });
}

User.delete = function (IdClient, result) {
    connection.query("DELETE FROM user WHERE IdClient = ?", [IdClient], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " user deleted");
                result(null, res);
            }
        });
}

module.exports = User;