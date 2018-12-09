let express = require("express");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const jwtDecode = require('jwt-decode');

const {
    LIST_PROPERTY_REQUEST_TOPIC, LIST_PROPERTY_RESPONSE_TOPIC,
    DETAIL_PROPERTY_REQUEST_TOPIC, DETAIL_PROPERTY_RESPONSE_TOPIC,
    PROPERTY_HISTORY_REQUEST_TOPIC, PROPERTY_HISTORY_RESPONSE_TOPIC
} = require('./../kafka/topics');
let router = express.Router();

router.get("/search/list", (req, res) => {
    kafka.make_request(LIST_PROPERTY_REQUEST_TOPIC, LIST_PROPERTY_RESPONSE_TOPIC, req.query, function (err, result) {
        if (err) {
            sendInternalServerError(res);
        } else {
            responseHandler(res, result);
        }
    });
});

router.get("/search/detail", (req, res) => {
    if (!req.query.propertyId) {
        sendBadRequest(res,{
            detail: "propertyId is required" 
        });
    } else {
        kafka.make_request(DETAIL_PROPERTY_REQUEST_TOPIC, DETAIL_PROPERTY_RESPONSE_TOPIC, req.query, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

router.get("/history", (req, res) => {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4,req.headers.authorization.length));
    req.query.username = jwtDecoded.username;
    if (!req.query.historyFor) {
        sendBadRequest(res,{
            detail: "historyFor is required" 
        });
    } else {
        kafka.make_request(PROPERTY_HISTORY_REQUEST_TOPIC, PROPERTY_HISTORY_RESPONSE_TOPIC, req.query, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
})

module.exports = router;