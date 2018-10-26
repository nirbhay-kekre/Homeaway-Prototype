import { LOGIN_FAIL, LOGIN_SUCCESS, USER_AUTH_FAIL } from '../actions/types';

const initialState = {
    loginResponse: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: action.payload.data
            }
        case LOGIN_FAIL:
        console.log("Fail:")
            console.log({payload : action.payload});
            return {
                ...state,
                loginResponse: action.payload.response.data
            }
        case USER_AUTH_FAIL: 
            return initialState;// reseting state on AUTH failure on routes other than login
        default: return state;
    }
}