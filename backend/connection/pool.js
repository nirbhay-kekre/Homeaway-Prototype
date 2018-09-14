let mysql = require('mysql');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "homeaway"
});

function query(query, params ,callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null, null);
        } else {
            connection.query(query, params, function (error, results, fields) {
                connection.release();
                callback(error, results, fields);
            });
        }
    });
}

module.exports.poolQuery = query;
module.exports.pool= pool; 