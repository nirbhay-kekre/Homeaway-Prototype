import { BOOK_PROPERTY_SUCCESS, BOOK_PROPERTY_FAIL, USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';

export const bookPropertyAction = (propertyDetails) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        let response = null;
        try {
            console.log("logging in")
            response = await axios.post(getURL("/property/book"), propertyDetails, {
                headers: {
                    'Authorization': localStorage.getItem('jwtToken')
                }
            });
            console.log(response);
            if (response.data.success) {
                dispatch({
                    type: BOOK_PROPERTY_SUCCESS,
                    payload: response
                });
                resolve(response);
            }else{
                let error = {
                    response
                }
                dispatch({
                    type: BOOK_PROPERTY_FAIL,
                    payload: error
                });
                reject(response.data.message);
            }
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
                reject("Server is down!");
                error.response = {
                    data: {
                        success: false,
                        message: "Server is down!"
                    }
                }
            }
            else {
                if (error.response.status === 401) {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("loggedInUser");
                    dispatch({
                        type: USER_AUTH_FAIL
                    });
                }
            }
            dispatch({
                type: BOOK_PROPERTY_FAIL,
                payload: error
            });
            reject(error.response.data);
        }
    });
}