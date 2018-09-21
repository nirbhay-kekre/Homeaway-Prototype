let express = require("express");
let router = express.Router();

router.use(function (req, response, next){
    if(req.session.username){
        next();
    }
    else{
        response.writeHead(401, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
            success: false,
            message: "User not logged in",
        }));
    }
});

module.exports = router;