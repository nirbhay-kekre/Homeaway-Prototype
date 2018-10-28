const { prepareNoContent, prepareInternalServerError, prepareSuccess } = require('./responses')
const { Profile } = require('./../models/profile');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let profile = await Profile.findOneAndUpdate({
            username: req.username
        }, req, {new: true} );
        if (profile) {
            resp = prepareSuccess({
                ...profile._doc
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