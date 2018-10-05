let express = require("express");
let query = require("../connection/pool").poolQuery;

let router = express.Router();

let isUserTraveler = function (req, resp, next) {
    if (req.session.username && (req.session.role == "traveler" || req.session.role == "both")) {
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

router.post("/book", isUserTraveler, function (req, resp) {
    if (req.session.username && req.body.propertyId && req.body.arrivalDate && req.body.departureDate && req.body.amountPaid && req.body.owner_username) {
        query(`select propertyId from propertyBlockDate 
        where  propertyId = ${req.body.propertyId} and (str_to_date('${req.body.arrivalDate}','%Y-%m-%d')  between startDate and endDate or str_to_date('${req.body.departureDate}','%Y-%m-%d')  between startDate and endDate  or
        startDate between str_to_date('${req.body.arrivalDate}','%Y-%m-%d') and str_to_date('${req.body.departureDate}','%Y-%m-%d') or endDate between str_to_date('${req.body.arrivalDate}','%Y-%m-%d') and str_to_date('${req.body.departureDate}','%Y-%m-%d') )`, [],
            function (error, records, fields) {
                if (error) {
                    resp.writeHead(500, {
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: false,
                        message: "internal server error"
                    }));
                } else {
                    if (records && records.length > 0) {
                        resp.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        resp.end(JSON.stringify({
                            success: false,
                            message: "Property is not Available"
                        }))
                    } else {
                        query(` insert into  bookingHistory (owner_username , propertyId , startDate, endDate , occupants, amountPaid, buyer_username ) 
                            values ("${req.body.owner_username}", ${req.body.propertyId}, str_to_date('${req.body.arrivalDate}','%Y-%m-%d'), str_to_date('${req.body.departureDate}','%Y-%m-%d') ,${req.body.occupants ? req.body.occupants : 1}, ${req.body.amountPaid}, "${req.session.username}")`, [],
                            function (error, records, fields) {
                                if (error) {
                                    resp.writeHead(200, {
                                        'Content-Type': 'application/json'
                                    });
                                    resp.end(JSON.stringify({
                                        success: false,
                                        message: "Booking failed"
                                    }))
                                } else {
                                    let bookingId = records.insertId;
                                    query(`insert into propertyBlockDate (propertyId, startDate, endDate) values ( ${req.body.propertyId}, '${req.body.arrivalDate}', '${req.body.departureDate}')`, [],
                                        function (error, records, response) {
                                            if (error) {
                                                query(`delete from bookingHistory where bookingId=${bookingId}`, [],function(error,records,fields){/* not doing anything for lab1 */});
                                                resp.writeHead(200, {
                                                    'Content-Type': 'application/json'
                                                });
                                                resp.end(JSON.stringify({
                                                    success: false,
                                                    message: "Booking failed"
                                                }))
                                            } else {
                                                resp.writeHead(200, {
                                                    'Content-Type': 'application/json'
                                                });
                                                resp.end(JSON.stringify({
                                                    success: true,
                                                    message: "successfully Booked",
                                                    bookingId
                                                }));
                                            }
                                        });
                                }
                            });
                    }
                }
            });
    } else {
        resp.writeHead(400, {
            'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
            success: false,
            message: "All fields are not available"
        }))
    }

});

module.exports = router;