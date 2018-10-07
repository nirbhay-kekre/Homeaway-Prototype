let express = require("express");
let query = require("../connection/pool").poolQuery;

let router = express.Router();

router.post("/", function(req, resp){
    query("update credentials set role = 'both' where username= ? ", [req.session.username], function(error, records, fields){
        if (error) {
            console.log(`Error: ${error.message}`);
            resp.writeHead(500, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: false,
                message: "Internal Server Error"
            }));
        }else{
            resp.cookie('cookie',{
                username: req.session.username,
                firstname: req.session.firstname,
                lastname:req.session.lastname,
                role: "both"
            },{maxAge: 900000, httpOnly: false, path : '/'});

            req.session.role= "both";
            resp.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resp.end(JSON.stringify({
                success: true,
                message: `${req.session.username} now both owner and traveler`
            }));
        }
    }  )
});
module.exports = router;