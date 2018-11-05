const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Message } = require('./../models/message');

async function handle_request(req, callback) {
    let resp = {}
    try {
        let conversation = await Message.findOne(createSearchCriteriaForMessage(req));
        let storedConversation = null;
        if (conversation) {
            storedConversation= await Message.findOneAndUpdate(createSearchCriteriaForMessage(req), {
                $push: {
                    messages:  {
                        from: req.from,
                        to: req.to,
                        message: req.message
                    }
                }
            } );
        } else {
            conversation ={
                owner: req.owner,
                traveler: req.traveler,
                propertyId: req.propertyId,
                headline: req.headline,
                messages: [{
                    from: req.from,
                    to: req.to,
                    message: req.message
                }]
            }
            storedConversation = await Message.create(conversation);
        }
        resp = prepareSuccess();
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

createSearchCriteriaForMessage = (req) => {
    let searchingCriteria = {
        owner: req.owner,
        traveler: req.traveler,
        propertyId: req.propertyId,
    }
    return searchingCriteria;
}

exports.handle_request = handle_request;