let express = require("express");
let query = require("../connection/pool").poolQuery;
let bycrypt = require("bcrypt");

let router = express.Router;

router.post("/login", (req, res) => {
    let usernameActual = req.body.username;
    let passwordActual = req.body.password;
    macthCredentialsInDB(usernameActual, passwordActual, res);
});

function macthCredentialsInDB(usernameActual, passwordActual, resp) {

    query(`SELECT username, password from credentials where username= ?`,[usernameActual], function (error, records, fields) {
        if (error) {
            console.log(`Error: ${error.message}`);
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal Server Error"
            }));
        } else if (records && records[0]) {
            let record = records[0];
            bycrypt.compare(passwordActual, record.password, function (err, result) {
                if (result) {
                    // res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.username = record.username;
                    req.session.role= record.role;
                    resp.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: true,
                        message: "Successfull",
                        username: record.username,
                        role: record.role
                    }));
                } else {
                    resp.writeHead(401, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: false,
                        message: "The username or password you entered is incorrect."
                    }));
                }
            });

        }
    });
}

module.exports.router = router;
