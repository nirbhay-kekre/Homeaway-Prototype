let express = require("express");
let query = require("../connection/pool").poolQuery;
let bycrypt = require("bcrypt");

let router = express.Router();

/*router.use("/", function(req,resp,next){
    if(req.session.username){
        resp.cookie('cookie',{
            username: req.session.username,
            firstname: req.session.firstname,
            lastname:req.session.lastname,
            role: req.session.role
        },{maxAge: 900000, httpOnly: false, path : '/'});
        resp.writeHead(200, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: true,
            message: "user already logged in",
            username: req.session.username,
            role: req.session.role
        }));
    }else{
        next();
    }
})*/

router.post("/", (req, res) => {
    let usernameActual = req.body.username;
    let passwordActual = req.body.password;
    let role = req.body.role;
    macthCredentialsInDB(usernameActual, passwordActual, role, req, res);
});

function macthCredentialsInDB(usernameActual, passwordActual, role, req, resp) {

    query(`SELECT cred.username, cred.password, cred.role, pro.firstname, pro.lastname from credentials cred, profile pro where pro.username=cred.username and cred.username= ? and (cred.role= ? or cred.role= 'both')`,[usernameActual, role], function (error, records, fields) {
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
                    resp.cookie('cookie',{
                        username: record.username,
                        firstname: record.firstname,
                        lastname:record.lastname,
                        role: record.role
                    },{maxAge: 900000, httpOnly: false, path : '/'});

                    req.session.username = record.username;
                    req.session.role= record.role;
                    req.session.firstname=record.firstname;
                    req.session.lastname=record.lastname;
                    resp.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: true,
                        message: "Successfull",
                        username: record.username,
                        role: record.role,
                        firstname: record.firstname,
                        lastname: record.lastname
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
        }else {
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

module.exports = router;
