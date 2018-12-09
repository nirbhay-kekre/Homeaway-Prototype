import {combineReducers} from 'redux';
import propertiesReducer from './propertiesReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';
import signupReducer from './signupReducer';
import postPropertyReducer from './postPropertyReducer';
import bookPropertyReducer from './bookPropertyReducer';
import propertyHistoryReducer from './propertyHistoryReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
    searchProperty : propertiesReducer,
    loginReducer: loginReducer,
    userProfileReducer: userProfileReducer,
    signupReducer: signupReducer,
    postPropertyReducer: postPropertyReducer,
    bookPropertyReducer: bookPropertyReducer,
    propertyHistoryReducer: propertyHistoryReducer,
    conversationReducer: conversationReducer
})