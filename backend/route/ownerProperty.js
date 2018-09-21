let express = require("express");
let query = require("../connection/pool").poolQuery;
let DateDiff = require("date-diff");
let multer = require("multer");
let storage = multer.diskStorage({
    destination: function (req, file, callbk) {
        callbk(null, "backend/uploads/property")
    },
    filename: function (req, file, callbk) {
        callbk(null, req.body.propertyId+"_"+new Date().toISOString() + "_property" +
            ((file.mimetype === 'image/jpeg') ? ".jpeg" : (file.mimetype === 'image/png') ? ".png" : ""));
    }
});

function fileFilter(req, file, callbk){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callbk(null,true);
    }else{
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

let router = express.Router();

router.use("/", function (req, resp, next) {
    if (req.session.username && req.session.role == "owner") {
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
});


router.use("/create", function (req, resp, next) {
    req.checkBody("bedroom", "bedroom NAN").matches(/^[0-9]$/);
    req.checkBody("bathroom", "bathroom NAN").matches(/^[0-9]$/);
    req.checkBody("zip", "zip NAN").matches(/^[0-9]{5}$/);
    req.checkBody("street", "street is empty").notEmpty();
    req.checkBody("city", "city is empty").notEmpty();
    req.checkBody("state", "state is empty").notEmpty();
    req.checkBody("country", "country is empty").notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: msg
        }));
    } else {
        next();
    }
});

router.post("/create", function (req, resp) {
    let { bedroom, bathroom, street, city, state, zip, country, unit } = req.body;
    let data = {
        username: req.session.username,
        street: street, city: city, unit: unit,
        state: state, zip: zip, country: country,
        bathroom: bathroom, bedroom: bedroom
    };
    insertData(resp, data);
});


router.post("/update", function (req, resp) {
    let { bedroom, bathroom, street, city, state, zip, country, unit,
        propertyId, headline, propertyDescription, propertyType,
        accomodates, bookingOption, oneNightRate, minNightStay, isActive } = req.body;
    if (!propertyId) {
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "propertyId is missing",
        }));
    }
    else {
        let data = {
            street: street, city: city, unit: unit,
            state: state, zip: zip, country: country,
            bathroom: bathroom, bedroom: bedroom,
            headline: headline, propertyDescription: propertyDescription,
            propertyType: propertyType, accomodates: accomodates,
            bookingOption: bookingOption, oneNightRate: oneNightRate,
            minNightStay: minNightStay, isActive: isActive
        };
        updateData(req, resp, data, propertyId);
    }
});

router.post("/amenities", function(req,resp){
    let {propertyId, amenities} = req.body;
    if(amenities && amenities[0]){
        if(!propertyId){
            resp.writeHead(400, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "propertyId is missing",
            }));
        }else{
            query("DELETE from amenities where propertyId = ?", [propertyId], function(error, records,fields){
                if(error){
                    resp.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: false,
                        message: "Internal server error",
                    }));
                }else{
                    let sqlQuery=`Insert into amenities ( propertyId, amenity) values (${propertyId}, "${amenities[0]}")`
                    for(i=1;i< amenities.length; i++ ){
                        sqlQuery +=`, (${propertyId}, "${amenities[i]}")`
                    }
                    query(sqlQuery, [], function(error,records, fields){
                        if(error){
                            resp.writeHead(500, {
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: false,
                                message: "Internal server error",
                            }));
                        }else{
                            resp.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: true,
                                message: "amenities updated",
                                amenities: amenities,
                                propertyId: propertyId
                            }));
                        }
                    });
                }
            });
        }
    }else{
        resp.writeHead(200, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: true,
            message: "amenities updated",
            amenities: amenities,
            propertyId: propertyId
        }));
    }
});

router.post("/photos", upload.array("picture", 5), function(req,resp){
    let {propertyId} = req.body;
    let photoUrls=[];
    if(req.files){
        if(!propertyId){
            resp.writeHead(400, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "propertyId is missing",
            }));
        }else{
            query("DELETE from propertyPhotos where propertyId = ?", [propertyId], function(error, records,fields){
                if(error){
                    resp.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: false,
                        message: "Internal server error",
                    }));
                }else{
                    photoUrls = req.files.map(file=>`http://localhost:3001/propertyPic/${file.filename}`)
                    let sqlQuery=`Insert into propertyPhotos ( propertyId, photoUrl) values (${propertyId}, "${photoUrls[0]}")`
                    for(i=1;i< photoUrls.length; i++ ){
                        sqlQuery +=`, (${propertyId}, "${photoUrls[i]}")`
                    }
                    query(sqlQuery, [], function(error,records, fields){
                        if(error){
                            resp.writeHead(500, {
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: false,
                                message: "Internal server error",
                            }));
                        }else{
                            resp.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: true,
                                message: "proportyPhoto updated",
                                photoUrl: photoUrls,
                                propertyId: propertyId
                            }));
                        }
                    });
                }
            })
        }
    }else{
        resp.writeHead(200, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: true,
            message: "proportyPhoto updated",
            photoUrl: photoUrls,
            propertyId: propertyId
        }));
    }
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

module.exports = router;