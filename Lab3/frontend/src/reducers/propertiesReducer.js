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
                searchResults: action.payload.data.properties.results,
                pagination: {
                    total: action.payload.data.properties.total,
                    limit: action.payload.data.properties.limit,
                    offset: action.payload.data.properties.offset,
                    page: action.payload.data.properties.page,
                    pages: action.payload.data.properties.pages
                }
            }
        case FETCH_PROPERTY_DETAIL:
            return {
                ...state,
                result: action.payload.data.property || {}
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