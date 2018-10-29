let multer = require("multer");
const path = require("path");
let express = require("express");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./responses');
const kafka = require('./../kafka/client');
const {
    POST_PROPERTY_REQUEST, POST_PROPERTY_RESPONSE,
} = require('./../kafka/topics');
const config = require('./../authProxy/config/settings');
const jwtDecode = require('jwt-decode');

let storage = multer.diskStorage({
    destination: function (req, file, callbk) {
        console.log(__dirname);
        callbk(null, path.join(__dirname, "../uploads/property/"))
    },
    filename: function (req, file, callbk) {
        const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
        callbk(null, jwtDecoded.username + "_" + new Date().toISOString() + "_property" +
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
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
})

const isUserOwner = function (req, resp, next) {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    if (jwtDecoded.username && (jwtDecoded.role === "owner" || jwtDecoded.role === "both")) {
        next();
    } else {
        resp.writeHead(403, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "User not an owner",
        }));
    }
};

let router = express.Router();

router.use("/create", isUserOwner, upload.any(), function (req, res, next) {
    const jwtDecoded = jwtDecode(req.headers.authorization.substring(4, req.headers.authorization.length));
    req.body.owner = jwtDecoded.username;
    req.body.propertyId = jwtDecoded.username+"_"+((new Date()).getTime());
    if (req.files) {
        req.body.photoUrl = req.files.map(file => `http://${config.backend_host}:${config.backend_port}/propertyPic/${file.filename}`)
    }
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    } else {
        kafka.make_request(POST_PROPERTY_REQUEST, POST_PROPERTY_RESPONSE, req.body, function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

function validateInput(req) {
    req.checkBody("headline", "Property headline is missing").notEmpty();
    req.checkBody("propertyType", "property type is required").notEmpty();
    req.checkBody("bedroom", "number of bedrooms are missing").notEmpty();
    req.checkBody("bathroom", "number of bathrooms are missing").notEmpty();
    req.checkBody("accomodates", "number of accomodates are required").notEmpty();
    req.checkBody("street", "Street address is required").notEmpty();
    req.checkBody("city", "City is required").notEmpty();
    req.checkBody("state", "State is required").notEmpty();
    req.checkBody("zip", "Zip is required").notEmpty();
    req.checkBody("country", "country is required").notEmpty();
    req.checkBody("oneNightRate", "one night rate is required").notEmpty();
    req.checkBody("propertyDescription", "property Description is required").notEmpty();
    req.checkBody("bookingOption", "booking option is required").notEmpty();
    req.checkBody("minNightStay", "min night stay is required").notEmpty();
    
    req.checkBody("owner", "owner's username is required").notEmpty();
    req.checkBody("phone", "Phone number must be 10 digits").isLength({ max: 10 });
    let errors = req.validationErrors();
    if(!req.body.availability || !req.body.availability.length>0 ){
        // if(errors === false){
        //     errors =[];
        // }
        // errors.push({
        //     location: "body",
        //     msg: "property availability is required",
        //     param: "availability"
        // });
        req.body.availability =[
            {
                "startDate": "2018-10-25T00:00:00.000Z",
                "endDate": "2018-12-25T00:00:00.000Z"
            }
        ];
    }
    if(!req.body.photoUrl || !(req.body.photoUrl.length >=2 && req.body.photoUrl.length<=5) ){
        if(errors === false){
            errors =[];
        }
        errors.push({
            location: "body",
            msg: "2-5 Property Photos are required",
            param: "photoUrls"
        });
    }
    return errors;
}

module.exports = router;