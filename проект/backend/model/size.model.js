var connection = require('../config/config.bd.js');

var Size = function (size) {
    this.IdSize = size.IdSize;
    this.WarehouseSize = size.WarehouseSize;
}

Size.create = function (newSize, result) {
    connection.query("INSERT INTO Size set ?", newSize, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

Size.findById = function (IdSize, result) {
    connection.query("SELECT * FROM Size WHERE IdSize = ?", IdSize, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Size.findAll = function (result) {
    connection.query("SELECT * FROM Size", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("Size: ", res);
                result(null, res);
            }
        });
}

Size.update = function (IdSize, size, result) {
    connection.query("UPDATE Size SET WarehouseSize = ? WHERE IdSize = ?", 
        [size.WarehouseSize, IdSize], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " Size updated");
                result(null, res);
            }
        });
}

Size.delete = function (IdSize, result) {  
    connection.query("DELETE FROM Size WHERE IdSize = ?", IdSize, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res.affectedRows + " Size deleted");
            result(null, res);
        }
    }); 
}

module.exports = Size;