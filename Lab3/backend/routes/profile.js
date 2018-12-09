let express = require("express");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const {
    PROFILE_VIEW_REQUEST_TOPIC, PROFILE_VIEW_RESPONSE_TOPIC,
    PROFILE_UPDATE_REQUEST_TOPIC, PROFILE_UPDATE_RESPONSE_TOPIC
} = require('./../kafka/topics');
let router = express.Router();
let multer = require("multer");
const path = require("path");
const jwtDecode = require('jwt-decode');
const config = require('./../authProxy/config/settings');

let storage = multer.diskStorage({
    destination: function (req, file, callbk) {
        console.log("path ---> ", path.join(__dirname, "../uploads/profile/"));

        callbk(null, path.join(__dirname, "../uploads/profile/"))
    },
    filename: function (req, file, callbk) {
        const jwtDecoded = jwtDecode(req.headers.authorization.substring(4,req.headers.authorization.length));
        callbk(null, jwtDecoded.username + "_profile" +
            ((file.mimetype === 'image/jpeg') ? ".jpeg" : (file.mimetype === 'image/png') ? ".png" : ""));
    }
});

function fileFilter(req, file, callbk) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callbk(null, true);
    } else {
        callbk(null, false);
    }
}

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get("/view", (req, res) => {
    if (!req.query.username) {
        sendBadRequest(res, {
            detail: "username is required to view profile"
        });
    } else {
        kafka.make_request(PROFILE_VIEW_REQUEST_TOPIC, PROFILE_VIEW_RESPONSE_TOPIC, req.query, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

router.post("/update", upload.single('profilePhoto'), function (req, res) {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4,req.headers.authorization.length));
    req.body.username = jwtDecoded.username;
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    } else {
        kafka.make_request(PROFILE_UPDATE_REQUEST_TOPIC, PROFILE_UPDATE_RESPONSE_TOPIC, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

function validateInput(req) {
    if (req.file !== undefined) {
        req.body.profilefilepath = `http://${config.backend_host}:${config.backend_port}/profilePic/` + req.file.filename;
        console.log("new profile ----> ",req.body.profilefilepath);
    }

    req.checkBody("firstname", "First name is required").notEmpty();
    req.checkBody("lastname", "Last name is required").notEmpty();
    req.checkBody("phone", "Phone number must be 10 digits").isLength({ max: 10 });
    let errors = req.validationErrors();
    return errors;
}

module.exports = router;