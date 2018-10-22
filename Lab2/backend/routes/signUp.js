let express = require("express");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const { SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC } = require('./../kafka/topics');
let router = express.Router();

router.post("/", (req, res) => {
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(SIGNUP_REQUEST_TOPIC, SIGNUP_RESPONSE_TOPIC, req.body, function (err, result) {
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
    req.checkBody("username", "The email you provided is an invalid email format.").isEmail();
    req.checkBody("password", "A Password is required.").notEmpty();
    req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,32}$/);
    req.checkBody("firstname", "First name is required").notEmpty();
    req.checkBody("lastname", "Last name is required").notEmpty();
    if (!req.body.role) {
        req.body.role = "traveler"; //default is traveler account.
    }
    let errors = req.validationErrors();
    return errors;
}

module.exports = router;