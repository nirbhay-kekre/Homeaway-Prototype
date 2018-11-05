import {
    PROPERTY_HISTORY
} from '../actions/types';

const initialState = {
    property: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROPERTY_HISTORY:
            return {
                ...state,
                historyResponse: action.payload.data
            }
        default: return state;
    }
}