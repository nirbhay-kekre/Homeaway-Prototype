import {
    PROPERTY_HISTORY, USER_AUTH_FAIL
} from './types'
import getURL from './url';
import axios from 'axios';

export const fetchPropertyHistory = (filters, historyFor = "buyer", sold = false, pageNumber = 1, limit = 10) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            let params = {
                historyFor,
                filters,
            }
            if(sold){
                params.sold = true
            }
            let response = await axios.get(getURL('/property/history'),
                {
                    params,
                    headers: {
                        'Authorization': localStorage.getItem('jwtToken')
                    }
                });
            dispatch({
                type: PROPERTY_HISTORY,
                payload: response
            });
            resolve(response);
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            } else if (error.response.status === 401) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
            }
            reject(error);
        }
    });
}

