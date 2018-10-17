import { LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/types';

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
        default: return state;
    }
}