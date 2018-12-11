import {
    PROPERTY_HISTORY, USER_AUTH_FAIL
} from './types'
import getURL from './url';
import axios from 'axios';
import { ApolloService } from './../graphql/ApolloClient';
import Queries from './../graphql/query';

export const fetchPropertyHistory = (filters, historyFor = "buyer", sold = false, pageNumber = 1, limit = 10) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            let params = {
                historyFor: historyFor,
                filters: JSON.stringify(filters),
            }
            if (sold) {
                params.sold = true
            }
            let response = await ApolloService.query({
                variables: {
                    ...params
                },
                query: Queries.GET_BOOKING_HISTORY
            });
            if (response.data.history.statusCode === 200 && response.data.history.success === true) {
                dispatch({
                    type: PROPERTY_HISTORY,
                    payload: response
                });
                resolve(response);
            }else if (response.data.history.statusCode === 401) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
                reject (response);
            }
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            } 
            reject(error);
        }
    });
}

