var connection = require('../config/config.bd');

var WarehouseType = function (warehouseType) {
    this.IdWarehouseType = warehouseType.IdWarehouseType;
    this.TypeName = warehouseType.TypeName;
}

WarehouseType.create = function (newWarehouseType, result) {
    connection.query("INSERT INTO WarehouseType set ?", newWarehouseType, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

WarehouseType.findById = function (IdWarehouseType, result) {
    connection.query("SELECT * FROM WarehouseType WHERE IdWarehouseType = ?", IdWarehouseType, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

WarehouseType.findAll = function (result) {
    connection.query("SELECT * FROM WarehouseType", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("WarehouseType: ", res);
                result(null, res);
            }
        });
}

WarehouseType.update = function (IdWarehouseType, warehouseType, result) {
    connection.query("UPDATE WarehouseType SET TypeName = ? WHERE IdWarehouseType = ?", 
        [warehouseType.TypeName, IdWarehouseType], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " WarehouseType updated");
                result(null, res);
            }
        });
}

WarehouseType.delete = function (IdWarehouseType, result) {  
    connection.query("DELETE FROM WarehouseType WHERE IdWarehouseType = ?", IdWarehouseType, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res.affectedRows + " WarehouseType deleted");
            result(null, res);
        }
    });
}

module.exports = WarehouseType;