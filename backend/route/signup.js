let express = require("express");
let query = require("../connection/pool").poolQuery;
let bcrypt = require("bcrypt");

let router = express.Router();

router.post("/", (req, resp) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let role = req.body.role;

    req.checkBody("username", "An Email address is required.").notEmpty();
    req.checkBody("username", "The email you provided is an invalid email format.").isEmail();
    req.checkBody("password", "A Password is required.").notEmpty();
    req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/);
    req.checkBody("firstname", "First name is required").notEmpty();
    req.checkBody("lastname", "Last name is required").notEmpty();
    if(!role){
        req.body.role= role = "traveler"; //default is traveler account.
    }
    let errors = req.validationErrors();
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: msg
        }));
    }
    else{
        checkAndStoreUser(username, password, firstname, lastname, role,resp);
    }
});
function checkAndStoreUser(username, password, firstname, lastname, role, response) {
    bcrypt.hash(password, 10, function(err, hash) {
        query(`INSERT INTO credentials(username,password,role) values(?,?,?)`, [username, hash, role], function (error, records, fields) {
            if (error) {
                if (error.errno === 1062) { //1062 is for primary key violation 
                    createErrorResponseWithMessage(409, "Email address is already in use." , response);
                } else if(error.errno === 1048){//1048 is for Not Null violation
                    createErrorResponseWithMessage(400, "All mandatory fields must be populated" , response);
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
                            createErrorResponseWithMessage(400, "All mandatory fields must be populated" , response);
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
module.exports = router;
