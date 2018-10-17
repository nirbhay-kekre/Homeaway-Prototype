import { FETCH_PROPERTIES_LIST, FETCH_PROPERTY_DETAIL, SEARCH_FILTER_CRITERIA } from './types'
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

export const fetchPropertiesList = (filters ={}) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        
        response = await axios.get("http://localhost:3001/property/search/list");
        console.log(response);
        dispatch({
            type: FETCH_PROPERTIES_LIST,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
}

export const fetchPropertyDetail = (propertyDetail) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await axios.get("http://localhost:3001/property/search/detail?",{
            params: propertyDetail
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
