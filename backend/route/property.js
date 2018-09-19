let express = require("express");
let query = require("../connection/pool").poolQuery;
let DateDiff = require("date-diff");

let router = express.Router;

router.use("/createProperty", function (req, resp, next) {
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

router.post("/createProperty", function (req, resp) {
    changeRoleToOwner();
    let { bedroom, bathroom, street, city, state, zip, country, unit } = req.body;
    let data = {
        username: req.session.username,
        street: street, city: city, unit: unit,
        state: state, zip: zip, country: country,
        bathroom: bathroom, bedroom: bedroom
    };
    insertData(resp, data);
});

/* owner role validator is added after "/createProperty" because,
 if any user creates a property we assign him an owner role */

router.use("/", function (req, resp, next) {
    if (req.session.username && req.session.role == "owner") {
        next();
    } else {
        resp.writeHead(401, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "User not an owner",
        }));
    }
});


router.post("/updateProperty", function (req, resp) {
    let { bedroom, bathroom, street, city, state, zip, country, unit,
        propertyId, headline, propertyDescription, propertyType,
        accomodates, bookingOption, oneNightRate, minNightStay, isActive } = req.body;
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
});

router.get("/search/list", function (req, resp) {
    let sqlQuery = createListPropertiesQuery(req);
    query(sqlQuery, [], function (error, records, fields) {
        if (error) {
            console.log(error);
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal server error",
            }));
        } else {
            if (records && records.length > 0) {
                let list = [], data = {};
                for (let i = 0; i < records.length; i++) {
                    const record = records[i];
                    if (data[record.propertyId] === undefined) {
                        data = {};
                        data[record.propertyId] = {};
                        data[record.propertyId].amenities = new Set();
                        data[record.propertyId].photoUrl = new Set();
                        data[record.propertyId] = {
                            propertyId: record.propertyId,
                            headline: record.headline,
                            propertyType: record.propertyType,
                            bedroom: record.bedroom,
                            bathroom: record.bedroom,
                            accomodates: record.accomodates,
                            street: record.street,
                            city: record.city,
                            state: record.state,
                            zip: record.zip,
                            country: record.country,
                            oneNightRate: record.oneNightRate
                        };
                        data["rank"] = i;    // will be used to maintain sorted result from the sql query, as amenity and photo are not sorting criteria
                        list.push(data);
                    }
                    if (record.amenity) {
                        data[record.propertyId].amenities.add(amenity);
                    }
                    if (record.photoUrl) {
                        data[record.propertyId].photoUrl.add(record.photoUrl);
                    }
                }
                list.sort((property1, property2) => property1.rank - property2.rank);
                resp.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: true,
                    message: `${list.length} results found`,
                    results: list
                }));
            } else {
                resp.writeHead(204, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: true,
                    message: "No Content",
                }));
            }
        }
    })
});

router.get("/search/detail", function (req, resp) {
    let sqlQuery = createDetailPropertyQuery(req);
    query(sqlQuery, [], function (error, records, fields) {
        if (error) {
            console.log(error);
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal server error",
            }));
        } else {
            if (records && records.length > 0) {
                let data = {};
                for (let i = 0; i < records.length; i++) {
                    const record = records[i];
                    if (data[record.propertyId] === undefined) {
                        data[record.propertyId] = {};
                        data[record.propertyId].amenities = new Set();
                        data[record.propertyId].photoUrl = new Set();
                        data[record.propertyId] = {
                            propertyId: record.propertyId,
                            headline: record.headline,
                            propertyType: record.propertyType,
                            bedroom: record.bedroom,
                            bathroom: record.bedroom,
                            accomodates: record.accomodates,
                            street: record.street,
                            city: record.city,
                            state: record.state,
                            zip: record.zip,
                            country: record.country,
                            oneNightRate: record.oneNightRate,
                            username: record.username,
                            propertyDescription: record.propertyDescription,
                            bookingOption: record.bookingOption,
                            minNightStay: record.minNightStay,
                        };
                    }

                    if (record.amenity) {
                        data[record.propertyId].amenities.add(amenity);
                    }
                    if (record.photoUrl) {
                        data[record.propertyId].photoUrl.add(record.photoUrl);
                    }
                }
                resp.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: true,
                    message: `result found`,
                    results: data
                }));
            } else {
                resp.writeHead(204, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: true,
                    message: "No Content",
                }));
            }
        }
    });
});
function createDetailPropertyQuery(req) {
    let { propertyId } = req.query;
    return `select prop.*, photo.photoUrl from(
        select p.*, a.amenity 
        from property p  left join amenities a on p.propertyId = a.propertyId 
        where p.markForDelete = 0 and isActive=1 and p.propertyId= ${propertyId}
    ) prop left join (select * from propertyPhotos where markForDelete = 0) photo on prop.propertyId = photo.propertyId`;
}
function createListPropertiesQuery(req) {
    let { filters, sortCriteria, sortOrder, arrivalDate, departureDate } = req.query;
    let sqlQuery = `select prop.*, photo.photoUrl from(
        select p.propertyId, p.headline, p.propertyType, p.bedroom, p.bathroom,
        p.accomodates, p.street, p.city, p.state, p.zip, p.country, p.oneNightRate, 
        a.amenity from property p left join amenities a
        on p.propertyId = a.propertyId where  p.markForDelete = 0 and isActive=1`;
    if (arrivalDate && departureDate) {
        let diff = DateDiff(new Date(arrivalDate), new Date(departureDate));
        sqlQuery += ` and (p.minNightStay = null or  p.minNightStay <= ${diff.days()}) and p.propertyId not in (
            select distinct propertyId from propertyBlockDate 
            where "${arrivalDate}"  between startDate and endDate or "${departureDate}"  between startDate and endDate  or
            startDate between "${arrivalDate}" and "${departureDate}" or endDate between "${arrivalDate}" and "${departureDate}" )`;
    }

    let keys = Object.keys(filters);
    if (filters && keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
            let val = filters[keys[i]];
            if (val instanceof Array && val.length > 0) {
                if (val.every((str) => typeof str === 'string')) {
                    sqlQuery += ` and ( ${keys[i]} in ("${val.join('", "')}") )`;
                }
                else {
                    //in our usecase it will be number if not string
                    sqlQuery += ` and ( ${keys[i]} in (${val.join()}) )`;
                }
            } else if (val.min) {
                if (val.max) {
                    if (typeof val.min === 'string' && typeof val.max === 'string') {
                        sqlQuery += ` and ( ${keys[i]} between "${val.min}" and "${val.max}")`;
                    } else {
                        sqlQuery += ` and ( ${keys[i]} between ${val.min} and ${val.max})`;
                    }
                } else {
                    if (typeof val.min === 'string') {
                        sqlQuery += ` and ( ${keys[i]} >= "${val.min}")`;
                    } else {
                        sqlQuery += ` and ( ${keys[i]} >= ${val.min})`;
                    }
                }
            } else if (val.max) {
                if (typeof val.min === 'string') {
                    sqlQuery += ` and ( ${keys[i]} <= "${val.max}")`;
                } else {
                    sqlQuery += ` and ( ${keys[i]} <= ${val.max})`;
                }
            } else if (typeof val === 'string') {
                sqlQuery += ` and ( ${keys[i]} = "${val}" )`
            } else {
                sqlQuery += ` and ( ${keys[i]} = ${val} )`
            }
        }
    }
    sqlQuery += ` ) prop left join (select * from propertyPhotos where markForDelete = 0) photo on prop.propertyId = photo.propertyId `;
    if (sortCriteria) {
        sqlQuery += ` order by ${sortCriteria}`
        if (sortOrder) {
            sqlQuery += ` ${sortOrder}`
        }
    }
    return sqlQuery;
}
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
