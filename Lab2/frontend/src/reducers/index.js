import {combineReducers} from 'redux';
import propertiesReducer from './propertiesReducer';
import loginReducer from './loginReducer'
import userProfileReducer from './userProfileReducer'
import signupReducer from './signupReducer'
export default combineReducers({
    searchProperty : propertiesReducer,
    loginReducer: loginReducer,
    userProfileReducer: userProfileReducer,
    signupReducer: signupReducer
})