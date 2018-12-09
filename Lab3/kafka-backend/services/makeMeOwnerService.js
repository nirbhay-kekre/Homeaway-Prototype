const { prepareNoContent, prepareInternalServerError, prepareSuccess } = require('./responses')
const { User } = require('./../models/user');
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    let resp = {}
    try {
        let user = await User.findOneAndUpdate({
            username: req.username,
        }, { role: req.role }, { new: true });
        let match = false;
        if (user) {
            resp = prepareSuccess({
                username: user.username,
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname
            });
        } else {
            resp = prepareNoContent({
                detail: "user is not present"
            });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;