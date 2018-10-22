const express = require("express");
const kafka = require('./../kafka/client');
const { LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError } = require('./responses');

const router = express.Router();

router.post("/", (req, res) => {
    kafka.make_request(LOGIN_REQUEST_TOPIC, LOGIN_RESPONSE_TOPIC, req.body, function (err, result) {
        console.log(result);
        if (err) {
            sendInternalServerError(res);
        } else {
            responseHandler(res, result);
        }

    });
});

module.exports = router;