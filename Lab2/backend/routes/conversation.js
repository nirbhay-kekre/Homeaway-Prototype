const express = require("express");
const kafka = require('./../kafka/client');
const { CONVERSATION_UPDATE_REQUEST, CONVERSATION_VIEW_REQUEST, 
    CONVERSATION_UPDATE_RESPONSE, CONVERSATION_VIEW_RESPONSE } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./responses');
const jwtDecode = require('jwt-decode');
const router = express.Router();

router.post("/send", (req, res) => {
    let errors = validateInputForAddingMessage(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(CONVERSATION_UPDATE_REQUEST, CONVERSATION_UPDATE_RESPONSE, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

router.get("/view", (req, res) => {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    req.body.username = jwtDecoded.username;
    let errors = validateInputForView(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(CONVERSATION_VIEW_REQUEST, CONVERSATION_VIEW_RESPONSE, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

function validateInputForAddingMessage(req) {
    req.checkBody("owner", "owner is required").notEmpty();
    req.checkBody("traveler", "traveler is required").notEmpty();
    req.checkBody("propertyId","propertyId is required").notEmpty();
    req.checkBody("from", "Message from is required").notEmpty();
    req.checkBody("to","Message to is required").notEmpty();
    req.checkBody("message", "Message is required").notEmpty();
    return req.validationErrors();
}

function validateInputForView(req) {
    req.checkBody("username", "username is required").notEmpty();
    return req.validationErrors();
}

module.exports = router;