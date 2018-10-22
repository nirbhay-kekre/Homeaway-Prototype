const express = require("express");
const kafka = require('./../kafka/client');
const { LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./responses');

const router = express.Router();

router.post("/", (req, res) => {
    console.log("Inside Login Route :");
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});
function validateInput(req) {
    req.checkBody("username", "An Email address is required.").notEmpty();
    req.checkBody("password", "A Password is required.").notEmpty();
    req.checkBody("role","A role is required.").notEmpty();
    return req.validationErrors();
}
module.exports = router;