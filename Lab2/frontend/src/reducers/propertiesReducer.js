import { FETCH_PROPERTIES_LIST, FETCH_PROPERTY_DETAIL, SEARCH_FILTER_CRITERIA } from '../actions/types';

const initialState = {
    searchResults: [],
    result:{},
    filters:{
        accomodates:{},
        sort: {},
        dates: {},
        pagination: {}
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PROPERTIES_LIST:
            return {
                ...state,
                searchResults: action.payload.data.results
            }
        case FETCH_PROPERTY_DETAIL:
            return {
                ...state,
                result: action.payload.data.result
            }
        case SEARCH_FILTER_CRITERIA:
            return{
                ...state,
                filters: action.payload
            }
        default: return state;
    }
}