import {
    CONVERSATION_GET, CONVERSATION_CLEAR
} from '../actions/types';

const initialState = {
    conversations: [],
    conversation: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CONVERSATION_GET:
            return {
                ...state,
                conversations: action.payload.data.conversations
            };
        case CONVERSATION_CLEAR:
            return initialState;
        default: return state;
    }
}