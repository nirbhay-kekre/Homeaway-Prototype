const express = require("express");
const kafka = require('./../kafka/client');
const { MAKE_ME_OWNER_REQUEST_TOPIC, MAKE_ME_OWNER_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./responses');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('./../authProxy/config/settings');
const jwtDecode = require('jwt-decode');

router.post("/", (req, res) => {
    console.log("Inside makemeOwner Route :");
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    req.body.username = jwtDecoded.username;
    req.body.role = "both";
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(MAKE_ME_OWNER_REQUEST_TOPIC, MAKE_ME_OWNER_RESPONSE_TOPIC, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                if(result.code === 200){
                    var token = jwt.sign(result.data, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    result.data.token = 'JWT ' + token;
                }
                responseHandler(res, result);
            }
        });
    }
});
function validateInput(req) {
    req.checkBody("username", "An Email address is required.").notEmpty();
    req.checkBody("role","A role is required.").notEmpty();
    return req.validationErrors();
}

module.exports = router;