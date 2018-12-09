import {
    BOOK_PROPERTY_SUCCESS, BOOK_PROPERTY_FAIL
} from '../actions/types';

const initialState = {
    bookingStatus: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case BOOK_PROPERTY_SUCCESS:
            return {
                ...state,
                bookingStatus: action.payload.data
            }
        case BOOK_PROPERTY_FAIL:
            console.log("Fail:")
            console.log({ payload: action.payload });
            return {
                ...state,
                bookingStatus: action.payload.response.data
            }
        default: return state;
    }
}