let express = require("express");
let query = require("../connection/pool").poolQuery;
let router = express.Router;

//need to do profile pic handling

router.get("/view", function(req,response){
    query("SELECT * from profile where username = ?", [req.session.username], function(error, records, fields){
        if(error){
            response.writeHead(500, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({
                success: false,
                message: "Internal Server Error"
            }));
        }else{
            if(records && records[0]){
                const record = records[0];
                response.writeHead(200, {
                    'Content-Type': `application/json`
                });
                response.end(JSON.stringify({
                    success: true,
                    username: record.username,
                    firstname: record.firstanme,
                    lastname: record.lastname,
                    aboutme: record.aboutme,
                    city: record.city,
                    company: record.company,
                    school: record.school,
                    hometown: record.hometown,
                    languages: record.languages,
                    gender: record.gender,
                    phone: record.phone,
                    profilefilepath: record.profilefilepath,
                    createdOn: record.createdOn
                }));
            }
        }
    }); 
});

router.post("/update", function(req,response){
    let profile = {firstname: req.body.firstanme, lastname: req.body.lastname,
    aboutme: req.body.aboutme, city: req.body.city, company: req.body.company, school: req.body.school,
    hometown: req.body.hometown, languages: req.body.languages, gender: req.body.gender,
    phone: req.body.phone, profilefilepath: req.body.profilefilepath, createdOn: req.body.createdOn
    }
    req.checkBody("firstname", "First name is required").notEmpty();
    req.checkBody("lastname", "Last name is required").notEmpty();

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
    }else{
        query("UPDATE profile SET ? where username = ?", [profile, req.session.username], function(error, records, fields){
            if(error){
                response.writeHead(500, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify({
                    success: false,
                    message: "Internal Server Error"
                }));
            } else{
                response.writeHead(200,{
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify({
                    success: true,
                    message: "profile updated"
                }))
            }  
        });
    }
});

module.exports.router = router;