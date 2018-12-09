const { prepareInternalServerError, prepareSuccess, prepareResourceConflictFailure } = require('./responses')
const { User } = require('./../models/user');
const { Profile } = require('./../models/profile')
const bcrypt = require("bcrypt");

async function handle_request(req, callback) {
    const { username, password, firstname, lastname, role } = req;
    let resp = {}
    try {
        let match = await User.findOne({
            username: username,
        });
        if (match) {
            resp = prepareResourceConflictFailure({
                message: "Email address is already in use."
            });
        } else {
            const cypher = await bcrypt.hash(password, 10);
            let user = await User.create({ username, password: cypher, firstname, lastname, role });
            console.log("created new user", user);
            let profile = await Profile.create({ username, firstname, lastname });
            console.log("created profile for user", profile);
            resp = prepareSuccess({ username: user.username, firstname: user.firstname, lastname: user.lastname });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;