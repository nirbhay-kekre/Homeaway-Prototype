import { USER_AUTH_FAIL, CONVERSATION_GET, CONVERSATION_CLEAR } from './types'
import axios from 'axios';
import getURL from './url';

export const getMessageAction = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            let response = await axios.get(getURL("/conversation/view"), {
                headers: {
                    'Authorization': localStorage.getItem('jwtToken'),
                },
            });
            dispatch({
                type: CONVERSATION_GET,
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
            dispatch({
                type: CONVERSATION_CLEAR,
            });
            reject(error);
        }
    });
}