import {
    FETCH_PROPERTIES_LIST, FETCH_PROPERTY_DETAIL,
    SEARCH_FILTER_CRITERIA, RESET_PROPERTY,
    USER_AUTH_FAIL,
} from './types'
import getURL from './url';
import axios from 'axios';

export const updateSearchPropertyFilterCriteria = (filter) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: SEARCH_FILTER_CRITERIA,
            payload: filter
        });
        resolve();
    });
}

export const fetchPropertiesList = (filters = {}, pageNumber = 1, limit = 10) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    console.log({ filters });
    try {
        response = await axios.get(getURL('/property/search/list'),
            {
                params: {
                    filters,
                    pagination: {
                        page: pageNumber,
                        limit
                    }
                },
                headers: {
                    'Authorization': localStorage.getItem('jwtToken')
                }
            });
        console.log(response);
        dispatch({
            type: FETCH_PROPERTIES_LIST,
            payload: response
        })
    } catch (error) {
        if (error.message === "Network Error") {
            console.log("Server is down!");
        } else if (error.response.status === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("loggedInUser");
            dispatch({
                type: USER_AUTH_FAIL
            });
            dispatch({
                type: RESET_PROPERTY
            })
        }
        console.log(error);
    }
}

export const fetchPropertyDetail = (propertyDetail) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await axios.get(getURL("property/search/detail?"), {
            params: propertyDetail,
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        });
        console.log(response);
        dispatch({
            type: FETCH_PROPERTY_DETAIL,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
}
