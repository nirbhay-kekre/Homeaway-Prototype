import { CHANGE_TO_OWNER_SUCCESS, USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';

export const changeOwnershipAction = () =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        response = await axios.post(getURL("makeMeOwner"),{},{
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        });
        console.log("change to Owner response");
        console.log(response);
        localStorage.setItem("loggedInUser", JSON.stringify({
            username: response.data.username,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            role: response.data.role
        }));
        localStorage.setItem("jwtToken", response.data.token);
        dispatch({
            type: CHANGE_TO_OWNER_SUCCESS,
            payload: response
        })
    } catch (error) {
        if (error.message === "Network Error") {
            console.log("Server is down!");
        }
        else if (error.response.status === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("loggedInUser");
            dispatch({
                type: USER_AUTH_FAIL
            });
        }
    }
    resolve()});
}