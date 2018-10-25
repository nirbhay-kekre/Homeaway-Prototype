let express = require("express");
const { sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const { LIST_PROPERTY_REQUEST_TOPIC, LIST_PROPERTY_RESPONSE_TOPIC } = require('./../kafka/topics');
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
module.exports = router;