import {combineReducers} from 'redux';
import propertiesReducer from './propertiesReducer';
import loginReducer from './loginReducer'

export default combineReducers({
    searchProperty : propertiesReducer,
    loginReducer: loginReducer
})