const connection = new require('./kafka/Connection');

var { mongoose } = require('./connection/mongoose');

const LoginService = require('./services/loginService.js');
const SignUpService = require('./services/signUpService');
const ListPropertiesService = require('./services/listPropertyService');
const PassportService = require('./services/passportService');
const DetailPropertyService = require('./services/detailPropertyService');
const ProfileViewService = require('./services/viewProfileService');
const ProfileUpdateService = require('./services/updateProfileService');
const MakeMeOwnerService = require('./services/makeMeOwnerService');
const postPropertyService = require('./services/postPropertyService');
const bookPropertyService = require('./services/bookPropertyService');
const propertyHistoryService = require('./services/propertyHistoryService')
const conversationViewService = require('./services/viewMessagingService');
const conversationUpdateService = require ('./services/updateMessageService');

const {
    LOGIN_REQUEST_TOPIC, SIGNUP_REQUEST_TOPIC,
    PASSPORT_REQUEST_TOPIC, LIST_PROPERTY_REQUEST_TOPIC,
    DETAIL_PROPERTY_REQUEST_TOPIC, PROFILE_VIEW_REQUEST_TOPIC,
    PROFILE_UPDATE_REQUEST_TOPIC, MAKE_ME_OWNER_REQUEST_TOPIC,
    POST_PROPERTY_REQUEST, BOOK_PROPERTY_REQUEST,
    PROPERTY_HISTORY_REQUEST_TOPIC, CONVERSATION_VIEW_REQUEST,
    CONVERSATION_UPDATE_REQUEST
} = require('./kafka/topics');

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('observing ',topic_name, 'for request');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest(LOGIN_REQUEST_TOPIC, LoginService);
handleTopicRequest(SIGNUP_REQUEST_TOPIC, SignUpService);
handleTopicRequest(LIST_PROPERTY_REQUEST_TOPIC, ListPropertiesService);
handleTopicRequest(PASSPORT_REQUEST_TOPIC, PassportService)
handleTopicRequest(DETAIL_PROPERTY_REQUEST_TOPIC, DetailPropertyService);
handleTopicRequest(PROFILE_VIEW_REQUEST_TOPIC, ProfileViewService);
handleTopicRequest(PROFILE_UPDATE_REQUEST_TOPIC,ProfileUpdateService);
handleTopicRequest(MAKE_ME_OWNER_REQUEST_TOPIC, MakeMeOwnerService);
handleTopicRequest(POST_PROPERTY_REQUEST, postPropertyService);
handleTopicRequest(BOOK_PROPERTY_REQUEST, bookPropertyService);
handleTopicRequest(PROPERTY_HISTORY_REQUEST_TOPIC, propertyHistoryService);
handleTopicRequest(CONVERSATION_UPDATE_REQUEST, conversationUpdateService);
handleTopicRequest(CONVERSATION_VIEW_REQUEST, conversationViewService);