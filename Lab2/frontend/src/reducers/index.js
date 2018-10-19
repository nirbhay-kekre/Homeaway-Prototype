import {combineReducers} from 'redux';
import propertiesReducer from './propertiesReducer';
import loginReducer from './loginReducer'
import userProfileReducer from './userProfileReducer'

export default combineReducers({
    searchProperty : propertiesReducer,
    loginReducer: loginReducer,
    userProfileReducer: userProfileReducer
})