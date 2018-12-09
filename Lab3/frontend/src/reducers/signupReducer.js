import { SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
    signupResponse: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupResponse: action.payload.data
            }
        case SIGNUP_FAIL:
            console.log("Fail:")
            console.log({ payload: action.payload });
            return {
                ...state,
                signupResponse: action.payload.response.data
            }
        default: return state;
    }
}