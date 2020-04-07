

const LoginService = require('./../../kafka-backend/services/loginService.js');
const SignUpService = require('./../../kafka-backend/services/signUpService');
const ListPropertiesService = require('./../../kafka-backend/services/listPropertyService');
const PassportService = require('./../../kafka-backend/services/passportService');
const DetailPropertyService = require('./../../kafka-backend/services/detailPropertyService');
const ProfileViewService = require('./../../kafka-backend/services/viewProfileService');
const ProfileUpdateService = require('./../../kafka-backend/services/updateProfileService');
const MakeMeOwnerService = require('./../../kafka-backend/services/makeMeOwnerService');
const postPropertyService = require('./../../kafka-backend/services/postPropertyService');
const bookPropertyService = require('./../../kafka-backend/services/bookPropertyService');
const propertyHistoryService = require('./../../kafka-backend/services/propertyHistoryService')
const conversationViewService = require('./../../kafka-backend/services/viewMessagingService');
const conversationUpdateService = require ('./../../kafka-backend/services/updateMessageService');

const { 
LOGIN_REQUEST_TOPIC, 
SIGNUP_REQUEST_TOPIC, 
PASSPORT_REQUEST_TOPIC, 
LIST_PROPERTY_REQUEST_TOPIC,  
DETAIL_PROPERTY_REQUEST_TOPIC,  
PROFILE_VIEW_REQUEST_TOPIC, 
PROFILE_UPDATE_REQUEST_TOPIC,  
POST_PROPERTY_REQUEST, 
MAKE_ME_OWNER_REQUEST_TOPIC,  
BOOK_PROPERTY_REQUEST, 
PROPERTY_HISTORY_REQUEST_TOPIC, 
CONVERSATION_VIEW_REQUEST, 
CONVERSATION_UPDATE_REQUEST, 
 } = require('./../kafka/topics');
var { mongoose } = require('./../../kafka-backend/connection/mongoose')
const topicToServiceMap = {
    [ LOGIN_REQUEST_TOPIC ] : LoginService,
    [ SIGNUP_REQUEST_TOPIC ] : SignUpService,
    [ LIST_PROPERTY_REQUEST_TOPIC ] : ListPropertiesService,
    [ PASSPORT_REQUEST_TOPIC ] : PassportService,
    [ DETAIL_PROPERTY_REQUEST_TOPIC ] : DetailPropertyService,
    [ PROFILE_VIEW_REQUEST_TOPIC ] : ProfileViewService,
    [ PROFILE_UPDATE_REQUEST_TOPIC] : ProfileUpdateService,
    [ MAKE_ME_OWNER_REQUEST_TOPIC ] : MakeMeOwnerService,
    [ POST_PROPERTY_REQUEST ] : postPropertyService,
    [ BOOK_PROPERTY_REQUEST ] : bookPropertyService,
    [ PROPERTY_HISTORY_REQUEST_TOPIC ] : propertyHistoryService,
    [ CONVERSATION_UPDATE_REQUEST ] : conversationUpdateService,
    [ CONVERSATION_VIEW_REQUEST ] : conversationViewService,
    //add topic: service here to bypass kafka
}

function byPassKafka(topic, msg_payload, callback){
    topicToServiceMap[topic].handle_request(msg_payload, callback);
}

module.exports={
    byPassKafka
}