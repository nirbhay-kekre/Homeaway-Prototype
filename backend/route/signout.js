let express = require("express");

let router = express.Router();

router.delete("/", function (req, resp) {
    req.session.destroy(err => console.log(err));
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: true,
        message: "successfully logged out"
    }));
});

module.exports = router;