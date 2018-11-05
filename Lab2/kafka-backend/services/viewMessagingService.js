const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Message } = require('./../models/message');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let conversations = await Message.find({
            $or: [
                { owner: req.username },
                { traveler: req.username }
            ]
        });
        resp = prepareSuccess({
            conversations
        });

    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

exports.handle_request = handle_request;