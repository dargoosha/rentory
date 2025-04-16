var connection = require('../config/config.bd.js');

var Warehouse = function (warehouse) {
    this.IdWarehouse = warehouse.IdWarehouse;
    this.IdWarehouseType = warehouse.IdWarehouseType;
    this.IdTemperature = warehouse.IdTemperature;
    this.Humidity = warehouse.Humidity;
    this.Ventilation = warehouse.Ventilation;
    this.IdCity = warehouse.IdCity;
    this.Address = warehouse.Address;
    this.IdSize = warehouse.IdSize;
    this.PrisePerDay = warehouse.PrisePerDay;

}

Warehouse.create = function (newWarehouse, result) {
    connection.query("INSERT INTO Warehouse set ?", newWarehouse, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

Warehouse.findById = function (IdWarehouse, result) {
    connection.query("SELECT * FROM Warehouse WHERE IdWarehouse = ?", IdWarehouse, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}   

Warehouse.findAll = function (result) {
    connection.query("SELECT * FROM Warehouse", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("Warehouse: ", res);
                result(null, res);
            }
        });
}

Warehouse.update = function (IdWarehouse, warehouse, result) {
    connection.query("UPDATE Warehouse SET IdWarehouseType = ?, IdTemperature = ?, Humidity = ?, Ventilation = ?, IdCity = ?, Address = ?, IdSize = ?, PrisePerDay = ? WHERE IdWarehouse = ?", 
        [warehouse.IdWarehouseType, warehouse.IdTemperature, warehouse.Humidity, warehouse.Ventilation, warehouse.IdCity, warehouse.Address, warehouse.IdSize, warehouse.PrisePerDay, IdWarehouse], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " Warehouse updated");
                result(null, res);
            }
        });
}

Warehouse.delete = function (IdWarehouse, result) {  
    connection.query("DELETE FROM Warehouse WHERE IdWarehouse = ?", IdWarehouse, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res.affectedRows + " Warehouse deleted");
            result(null, res);
        }
    });
}

module.exports = Warehouse;