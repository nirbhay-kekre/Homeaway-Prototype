let express = require("express");
let query = require("../connection/pool").poolQuery;

let router = express.Router;

router.use("/createProperty", function(req,resp, next){
    req.checkBody("bedroom", "bedroom NAN").matches(/^[0-9]$/);
    req.checkBody("bathroom", "bathroom NAN").matches(/^[0-9]$/);
    req.checkBody("zip", "zip NAN").matches(/^[0-9]{5}$/);
    req.checkBody("street", "street is empty").notEmpty();
    req.checkBody("city", "city is empty").notEmpty();
    req.checkBody("state", "state is empty").notEmpty();
    req.checkBody("country", "country is empty").notEmpty();

    let errors = req.validationErrors();
    if(errors){
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: msg
        }));
    }else{
        next();
    }
});

router.post("/createProperty", function(req, resp){
    changeRoleToOwner();
    let {bedroom, bathroom, street, city, state, zip, country, unit}=req.body;
    let data ={ username: req.session.username,
        street:street, city: city, unit:unit, 
        state: state, zip:zip, country: country,
        bathroom:bathroom, bedroom:bedroom
    };
    insertData(resp, data);
});

/* owner role validator is added after "/createProperty" because,
 if any user creates a property we assign him an owner role */

router.use("/", function (req,resp, next){
    if(req.session.user && req.session.role == "owner"){
        next();
    }else{
        resp.writeHead(401, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "User not an owner",
        }));
    }
});


router.post("/updateProperty", function(req, resp){
    let {bedroom, bathroom, street, city, state, zip, country, unit,
    propertyId, headline, propertyDescription, propertyType,
    accomodates, bookingOption, oneNightRate, minNightStay}=req.body;
    let data ={ 
        street:street, city: city, unit:unit, 
        state: state, zip:zip, country: country,
        bathroom:bathroom, bedroom:bedroom,
        headline: headline, propertyDescription: propertyDescription,
        propertyType: propertyType, accomodates: accomodates ,
        bookingOption: bookingOption,oneNightRate: oneNightRate, 
        minNightStay: minNightStay
    };
    updateData(req,resp,data,propertyId);
});

function insertData(resp, data) {
    query("INSERT INTO property SET ?", data, function (error, records, fields) {
        if (error) {
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal server error",
            }));
        } else {
            data.propertyId = records.insertId;
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify(Object.assign({
                success: true,
                message: "Property created",
            }, data)));
        }
    });
}

function changeRoleToOwner(req, resp) {
    if (req.session.role != "owner") {
        query("INSERT INTO credentials(role) values(?) where username = ?", ["owner", req.session.username], function (error, records, fields) {
            if (error) {
                console.log("user role not changed in DB");
                resp.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: false,
                    message: "Internal server error",
                }));
            }
            else {
                req.session.role = "owner";
            }
        });
    }
}
function updateData(req, resp, data, propertyId) {
    query("UPDATE property SET ? where username = ? and propertyId =?", [data, req.session.username, propertyId], function (error, records, fields) {
        if (error) {
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal server error",
            }));
        } else {
            data.propertyId = propertyId;
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify(Object.assign({
                success: true,
                message: "Property updated",
            }, data)));
        }
    });
}

module.exports.router = router;
