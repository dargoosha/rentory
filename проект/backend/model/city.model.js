var connection = require('../config/config.bd.js');

var City = function (city) {
    this.IdCity = city.IdCity;
    this.CityName = city.CityName;
}

City.create = function (newCity, result) {
    connection.query("INSERT INTO City set ?", newCity, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

City.findById = function (IdCity, result) {
    connection.query("SELECT * FROM City WHERE IdCity = ?", IdCity, 
    function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

City.findAll = function (result) {
    connection.query("SELECT * FROM City", 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("City: ", res);
                result(null, res);
            }
        });
}

City.update = function (IdCity, city, result) {
    connection.query("UPDATE City SET CityName = ? WHERE IdCity = ?", 
        [city.CityName, IdCity], 
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log(res.affectedRows + " City updated");
                result(null, res);
            }
        });
}

City.delete = function (IdCity, result) {  
    connection.query("DELETE FROM City WHERE IdCity = ?", IdCity, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = City;