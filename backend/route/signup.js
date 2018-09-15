let express = require("express");
let query = require("../connection/single").singleQuery;
let bcrypt = require("bcrypt");
let router = express.Router;

router.post("/signup", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let role = req.body.role;
    checkAndStoreUser(username, password, firstname, lastname, role);
});
function checkAndStoreUser(username, password, firstname, lastname, role, response) {
    bcrypt.hash(password, 10, function(err, hash) {
        query(`INSERT INTO credentials(username,password,role) values(?,?,?)`, [username, hash, role], function (error, records, fields) {
            if (error) {
                if (error.errno === 1062) { //1062 is for primary key violation 
                    createErrorResponseWithMessage(409, "Email address is already in use." , response);
                } else if(error.errno === 1048){//1048 is for Not Null violation
                    createErrorResponseWithMessage(409, "All mandatory fields must be populated" , response);
                }else{
                    createErrorResponseWithMessage(500, "Internal server error", response);
                }
            } else {
                query(`INSERT INTO profile(username,firstname,lastname) values(?,?,?)`, [username, firstname, lastname],
                function(error, records, fields){
                    if (error) {
                        if (error.errno === 1062) { //1062 is for primary key violation 
                            createErrorResponseWithMessage(409, "Email address is already in use." , response);
                        } else if(error.errno === 1048){//1048 is for Not Null violation
                            createErrorResponseWithMessage(409, "All mandatory fields must be populated" , response);
                        }else{
                            createErrorResponseWithMessage(500, "Internal server error", response);
                        }
                    }else{
                        response.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        response.end(JSON.stringify({
                            success: true,
                            message: "Successfull",
                            username: username,
                            firstname: firstname,
                            lastname: lastname
                        }));
                    }
                });
            }
        });
      });
}
function createErrorResponseWithMessage(code,message,response){
    response.writeHead(code, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify({
        success: false,
        message: message
    }));
}
module.exports.router = router;
