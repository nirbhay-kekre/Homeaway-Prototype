let express = require("express");
let query = require("../connection/pool").poolQuery;
let DateDiff = require("date-diff");

let router = express.Router();

router.use("/", function (req, resp, next) {
    if (req.session.username && req.session.role == "traveler") {
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
});

router.post("/book", function(req, resp){
    if(req.session.username && req.body.propertyId && req.body.arrival && req.body.departure && req.body.amountPaid){
        query(`select propertyId from propertyBlockDate 
        where "${req.body.arrival}"  between startDate and endDate or "${req.body.departure}"  between startDate and endDate  or
        startDate between "${req.body.arrival}" and "${req.body.departure}" or endDate between "${req.body.arrival}" and "${req.body.departure}" and propertyId = ${req.body.propertyId}`,[],
        function(error, records, fields){
            if(error){
                resp.writeHead(500,{
                    'Content-Type': 'application/json'
                });
                resp.end(JSON.stringify({
                    success: false,
                    message: "internal server error"
                }));
            }else{
                if(records && records.length>0){
                    resp.writeHead(200,{
                        'Content-Type': 'application/json'
                    });
                    resp.end(JSON.stringify({
                        success: false,
                        message: "Property is not Available"
                    }))
                }else{
                    query(`insert into bookingHistory (username, propertyId, startDate, endDate, role, amountPaid ) values (${req.session.username}, ${req.body.propertyId}, ${req.body.arrival}, ${req.body.departure}, ${req.body.role} ,${req.body.amountPaid})`, [], 
                    function(error, records, fields){
                        if(error){
                            resp.writeHead(200,{
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: false,
                                message: "Booking failed"
                            }))
                        }else{
                            resp.writeHead(200,{
                                'Content-Type': 'application/json'
                            });
                            resp.end(JSON.stringify({
                                success: true,
                                message: "successfully Booked",
                                bookingId: records.insertId
                            }));
                            query(`insert into propertyBlockDate (propertyId, startDate, endDate) values ( ${req.body.propertyId}, ${req.body.arrival}, ${req.body.departure})`, [],
                            function(error,records,response){
                                // TODO: Rollback transaction? -- not doing in lab 1
                            } );
                        }
                    });
                }
            }
        });
    }

});

module.exports = router;