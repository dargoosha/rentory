const mysql = require('mysql');

var connection = mysql.createConnection({   
    host: 'localhost',
    user: 'root',   
    password: '',
    database: 'rentory'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ...");
        return;
    }
    else {
        console.log("Error connecting database ..." + err);
        return;
    }
});

module.exports = connection;    