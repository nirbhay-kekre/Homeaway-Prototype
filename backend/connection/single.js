let mysql = require('mysql');

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "homeaway"
    });
}

function query(query, params, callback) {
    let connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            connection.end();
            console.log(`DB connection Error: ${err.message}`);
        } else {
            connection.query(query, params, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log(`DB query Error: ${err.message}`);
                } else {
                    callback(results, fields);
                }
            })
        }
    })
}

module.exports.singleQuery = query;
module.exports.getConnection =  getConnection;