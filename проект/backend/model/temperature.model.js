var connection = require('../config/config.bd.js');

var Temperature = function (temperature) {
    this.IdTemperature = temperature.IdTemperature;
    this.Temperature = temperature.Temperature;
}

Temperature.create = function (newTemperature, result) {
    connection.query("INSERT INTO Temperature set ?", newTemperature, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

Temperature.findById = function (IdTemperature, result) {
    connection.query("SELECT * FROM Temperature WHERE IdTemperature = ?", IdTemperature, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Temperature.findAll = function (result) {
    connection.query("SELECT * FROM Temperature", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("Temperature: ", res);
                result(null, res);
            }
        });
}

Temperature.update = function (IdTemperature, temperature, result) {
    connection.query("UPDATE Temperature SET Temperature = ? WHERE IdTemperature = ?", 
        [temperature.Temperature, IdTemperature], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " Temperature updated");
                result(null, res);
            }
        });
}

Temperature.delete = function (IdTemperature, result) {  
    connection.query("DELETE FROM Temperature WHERE IdTemperature = ?", IdTemperature, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log(res.affectedRows + " Temperature deleted");
            result(null, res);
        }
    }); 
}

module.exports = Temperature;   