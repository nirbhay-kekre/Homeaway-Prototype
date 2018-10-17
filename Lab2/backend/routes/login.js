let express = require("express");
// let query = require("../connection/pool").poolQuery;
let bycrypt = require("bcrypt");

let router = express.Router();

router.post("/", (req, res) => {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    let role = req.body.role;
    macthCredentialsInDB(inputUsername, inputPassword, role, req, res);
});

function macthCredentialsInDB(usernameActual, passwordActual, role, req, resp) {

    
}

module.exports = router;