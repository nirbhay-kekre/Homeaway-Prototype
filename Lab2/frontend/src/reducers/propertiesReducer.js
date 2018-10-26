import { FETCH_PROPERTIES_LIST, FETCH_PROPERTY_DETAIL, SEARCH_FILTER_CRITERIA, RESET_PROPERTY } from '../actions/types';

const initialState = {
    searchResults: [],
    result:{},
    filters:{
        accomodates:{},
        oneNightRate: {
            min:"",
            max:""
        },
        bedroom: {
            min:""
        },
        bathroom: {
            min:""
        },
        amenity: [],
        sorting: {}
    },
    pagination: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PROPERTIES_LIST:
            return {
                ...state,
                searchResults: action.payload.data.results,
                pagination: {
                    total: action.payload.data.total,
                    limit: action.payload.data.limit,
                    offset: action.payload.data.offset,
                    page: action.payload.data.page,
                    pages: action.payload.data.pages
                }
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
        case RESET_PROPERTY:
            return initialState;// reseting state on auth failure
        default: return state;
    }
}