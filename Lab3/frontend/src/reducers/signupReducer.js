import { SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
    signupResponse: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupResponse: action.payload.data.signup
            }
        case SIGNUP_FAIL:
            // console.log("Fail:")
            // console.log({ payload: action.payload });
            console.log({payload: action.payload});
            console.log("################");
            return {
                ...state,
                signupResponse: action.payload.data.signup
            }
        default: return state;
    }
}