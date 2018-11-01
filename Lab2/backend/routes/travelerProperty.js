const express = require("express");
const path = require("path");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const {
    BOOK_PROPERTY_REQUEST, BOOK_PROPERTY_RESPONSE,
} = require('./../kafka/topics');
const config = require('./../authProxy/config/settings');
const jwtDecode = require('jwt-decode');
const router = express.Router();

const isUserTraveler = function (req, resp, next) {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    if (jwtDecoded.username && (jwtDecoded.role === "traveler" || jwtDecoded.role === "both")) {
        next();
    } else {
        resp.writeHead(403, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "User not a traveler",
        }));
    }
};

router.post("/book", isUserTraveler, (req, res) => {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    req.body.buyer = jwtDecoded.username;
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    } else {
        kafka.make_request(BOOK_PROPERTY_REQUEST, BOOK_PROPERTY_RESPONSE, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

validateInput = (req) => {
    req.checkBody("propertyId", "Property Id is missing").notEmpty();
    req.checkBody("arrivalDate", "arrival date is missing").notEmpty();
    req.checkBody("departureDate", "departure date is missing").notEmpty();
    req.checkBody("guests", "number of guests are missing").notEmpty();
    req.checkBody("amountPaid", "amount Paid is required").notEmpty();
    req.checkBody("buyer", "Buyer username is required").notEmpty();
    return req.validationErrors();
}

module.exports = router;