import getURL from "./url";
import { GET_PROFILE_DETAIL, UPDATE_PROFILE } from './types';
import axios from 'axios';

export const fetchProfileDetailAction = (username) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await axios.get(getURL("/profile/view"), {
            params: {username: username},
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        });
        console.log(response);
        dispatch({
            type: GET_PROFILE_DETAIL,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfileAction = (fdata) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization']= localStorage.getItem('jwtToken');
        try {
            let response = await axios.post("http://localhost:3001/profile/update", fdata);
            dispatch({
                type: UPDATE_PROFILE,
                payload: response,
            });
            resolve(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })

}