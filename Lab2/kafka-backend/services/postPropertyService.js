const { prepareInternalServerError, prepareSuccess, prepareNoContent } = require('./responses')
const { Property } = require('./../models/property');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let property = await Property.create(req);
        if (property) {
            resp = prepareSuccess({
                result: {
                    ...property._doc
                }
            });
        }
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;