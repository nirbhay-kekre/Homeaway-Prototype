const { prepareAuthenticationFailure, prepareInternalServerError, prepareSuccess } = require('./responses')
const { User } = require('./../models/user');
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let user = await User.findOne({
            username: req.username,
        });
        let match = false;
        if (user) {
            if (user.role === req.role || user.role === "both") {            
                match = await bcrypt.compare(req.password, user.password);
            }
        }
        if (match) {
            resp = prepareSuccess({
                username: user.username,
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname
            });
        } else {
            resp = prepareAuthenticationFailure();
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;