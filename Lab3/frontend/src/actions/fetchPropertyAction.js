import {
    FETCH_PROPERTIES_LIST, FETCH_PROPERTY_DETAIL,
    SEARCH_FILTER_CRITERIA, RESET_PROPERTY,
    USER_AUTH_FAIL,
} from './types'
import getURL from './url';
import axios from 'axios';
import { ApolloService } from './../graphql/ApolloClient';
import Queries from './../graphql/query';

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
        response = await ApolloService.query({
            variables: {
                filters: JSON.stringify(filters),
                pagination: JSON.stringify({
                    page: pageNumber,
                    limit
                })
            },
            query: Queries.GET_PROPERTIES
        })
        console.log(response);
        if (response.data.properties.statusCode === 200 && response.data.properties.success === true) {
            dispatch({
                type: FETCH_PROPERTIES_LIST,
                payload: response
            })
        } else if (response.data.properties.statusCode === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("loggedInUser");
            dispatch({
                type: USER_AUTH_FAIL
            });
            dispatch({
                type: RESET_PROPERTY
            })
        }
    } catch (error) {
        if (error.message === "Network Error") {
            console.log("Server is down!");
        }
        console.log(error);
    }
}

export const fetchPropertyDetail = (propertyDetail) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await ApolloService.query({
            variables: {
                ...propertyDetail
            },
            query: Queries.GET_PROPERTY
        })
        console.log(response);
        if (response.data.property.statusCode === 200 && response.data.property.success === true) {
            dispatch({
                type: FETCH_PROPERTY_DETAIL,
                payload: response
            })
        } else if (response.data.property.statusCode === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("loggedInUser");
            dispatch({
                type: USER_AUTH_FAIL
            });
        }
    } catch (error) {
        if (error.message === "Network Error") {
            console.log("Server is down!");
        } 
        console.log(error);
    }
}
