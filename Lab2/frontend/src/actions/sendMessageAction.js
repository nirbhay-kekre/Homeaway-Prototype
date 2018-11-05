import { USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';

export const sendMessageAction = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            let response = await axios.post(getURL("/conversation/send"), data, {
                headers: {
                    'Authorization': localStorage.getItem('jwtToken'),
                },
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