let express = require("express");
let query = require("../connection/pool").poolQuery;
let DateDiff = require("date-diff");

let router = express.Router();


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
            let list = [];
            if (records && records.length > 0) {
                let data = {}, pointer = {};
                for (let i = 0; i < records.length; i++) {
                    const record = records[i];
                    if (pointer[record.propertyId] === undefined) {
                        pointer = {};
                        pointer[record.propertyId] = record.propertyId;
                        data = {};
                        data = {
                            propertyId: record.propertyId,
                            headline: record.headline,
                            propertyType: record.propertyType,
                            bedroom: record.bedroom,
                            bathroom: record.bathroom,
                            accomodates: record.accomodates,
                            street: record.street,
                            city: record.city,
                            state: record.state,
                            zip: record.zip,
                            country: record.country,
                            oneNightRate: record.oneNightRate
                        };
                        data.amenities = new Set();
                        data.photoUrl = new Set();
                        data["rank"] = i;    // will be used to maintain sorted result from the sql query, as amenity and photo are not sorting criteria
                        list.push(data);
                    }
                    if (record.amenity) {
                        data.amenities.add(record.amenity);
                    }
                    if (record.photoUrl) {
                        data.photoUrl.add(record.photoUrl);
                    }
                }
                list.forEach(function (part, index, arr) {
                    arr[index].amenities = [...arr[index].amenities];
                    arr[index].photoUrl = [...arr[index].photoUrl];
                });
                list.sort((property1, property2) => property1.rank - property2.rank);

            }
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: true,
                message: `${list.length} results found`,
                results: list,
                size: `${list.length}`
            }));
        }
    })
});

router.get("/search/detail", function (req, resp) {
    let arrivalDate = req.query.arrivalDate ? new Date(req.query.arrivalDate) : new Date();
    let departureDate = req.query.departureDate ? new Date(req.query.departureDate) : new Date();
    let guests = req.query.guests?req.query.guests:1;
    arrivalDate.setHours(0, 0, 0, 0);
    departureDate.setHours(0, 0, 0, 0);
    let numOfOnboardingDays = 1;
    if (departureDate > arrivalDate) {
        let dateDiff =new DateDiff(departureDate,arrivalDate);
        numOfOnboardingDays = dateDiff.days() + 1;
    }
    if (!req.query.propertyId) {
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "propertyId is missing",
        }));
    } else {

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
                    let data = {}, pointer = {};
                    for (let i = 0; i < records.length; i++) {
                        const record = records[i];
                        if (pointer[record.propertyId] === undefined) {
                            pointer = {};
                            pointer[record.propertyId] = record.propertyId;
                            data = {};
                            data = {
                                propertyId: record.propertyId,
                                headline: record.headline,
                                propertyType: record.propertyType,
                                bedroom: record.bedroom,
                                bathroom: record.bathroom,
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
                                totalPrice: record.oneNightRate * numOfOnboardingDays,
                                numOfOnboardingDays: numOfOnboardingDays,
                                arrivalDate:arrivalDate,
                                departureDate:departureDate,
                                guests: guests,
                            };
                            data.amenities = new Set();
                            data.photoUrl = new Set();
                        }

                        if (record.amenity) {
                            data.amenities.add(record.amenity);
                        }
                        if (record.photoUrl) {
                            data.photoUrl.add(record.photoUrl);
                        }
                    }
                    data.amenities = [...data.amenities];
                    data.photoUrl = [...data.photoUrl];

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
    }
});

router.get("/history", function (req, resp) {
    sqlQuery = createHistoryQuery(req);
    if (sqlQuery === null) {
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "incomplete data"
        }));
    } else {
        query(sqlQuery, [], function (error, records, fields) {
            if (error) {
                resp.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: false,
                    message: "internal server error"
                }));
            } else {
                let data = [];
                if (records && records.length > 0) {
                    let elem = {};
                    for (let i = 0; i < records.length; i++) {
                        let record = records[1];
                        if (elem.propertyId === undefined) {
                            elem = {
                                bookingId: record.bookingId,
                                propertyId: record.propertyId,
                                startDate: record.startDate,
                                endDate: record.endDate,
                                headline: record.headline,
                                street: record.street,
                                city: record.city,
                                state: record.state,
                                country: record.country,
                                zip: record.zip
                            }
                            elem["photoUrl"] = new Set();
                            data.push(elem);
                        }
                        if (record.photoUrl) {
                            elem["photoUrl"].add(record.photoUrl);
                        }
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
            }
        });
    }
});



function createHistoryQuery(req) {
    if (req.session.username && req.body.role) {
        return `select book.*, photo.photoUrl  from  propertyPhotos photo, 
    (select book.*, prop.headline, prop.street, prop.city, prop.state, 
        prop.country, prop.zip from bookingHistory book , property prop
         where book.propertyId =prop.propertyId and book.username='${req.session.username} and book.role= '${req.body.role}') book
          where book.propertyId= photo.propertyId`
    } else {
        return null;
    }
}

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
    if (filters) {
        filters = JSON.parse(filters);
    }
    let sqlQuery = `select prop.*, photo.photoUrl from(
        select p.propertyId, p.headline, p.propertyType, p.bedroom, p.bathroom,
        p.accomodates, p.street, p.city, p.state, p.zip, p.country, p.oneNightRate, 
        a.amenity from property p left join amenities a
        on p.propertyId = a.propertyId where  p.markForDelete = 0 and isActive=1`;
    if (arrivalDate && departureDate) {
        let diff = new DateDiff(new Date(departureDate), new Date(arrivalDate));
        sqlQuery += ` and (p.minNightStay = null or  p.minNightStay <= ${diff.days()}) and p.propertyId not in (
            select distinct propertyId from propertyBlockDate 
            where '${arrivalDate}'  between startDate and endDate or '${departureDate}' between startDate and endDate  or
            startDate between '${arrivalDate}' and '${departureDate}' or endDate between '${arrivalDate}' and '${departureDate}' )`;
    }

    if (filters) {
        let keys = Object.keys(filters);
        if (keys && keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let val = filters[keys[i]];
                if (val instanceof Array && val.length > 0) {
                    if (val.every((str) => typeof str === 'string')) {
                        sqlQuery += ` and ( ${keys[i]} in ("${val.join('", "')}") )`;
                    }
                    else if (val.every((str) => typeof str === 'number')) {
                        //in our usecase it will be number if not string
                        sqlQuery += ` and ( ${keys[i]} in (${val.join()}) )`;
                    }
                } else if (val.min) {
                    if (val.max) {
                        if (typeof val.min === 'string' && typeof val.max === 'string') {
                            sqlQuery += ` and ( ${keys[i]} between "${val.min}" and "${val.max}")`;
                        } else if (typeof val.min === 'number' && val.max === 'number') {
                            sqlQuery += ` and ( ${keys[i]} between ${val.min} and ${val.max})`;
                        }
                    } else {
                        if (typeof val.min === 'string') {
                            sqlQuery += ` and ( ${keys[i]} >= "${val.min}")`;
                        } else if (typeof val.min === 'number') {
                            sqlQuery += ` and ( ${keys[i]} >= ${val.min})`;
                        }
                    }
                } else if (val.max) {
                    if (typeof val.max === 'string') {
                        sqlQuery += ` and ( ${keys[i]} <= "${val.max}")`;
                    } else if (typeof val.max === 'number') {
                        sqlQuery += ` and ( ${keys[i]} <= ${val.max})`;
                    }
                } else if (val && typeof val === 'string') {
                    sqlQuery += ` and ( ${keys[i]} = "${val}" )`
                } else if (val && typeof val === 'number') {
                    sqlQuery += ` and ( ${keys[i]} = ${val} )`
                }
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


module.exports = router;