import getURL from "./url";
import { GET_PROFILE_DETAIL } from './types';
import axios from 'axios';

export const fetchProfileDetailAction = () => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await axios.get(getURL("/profile/view"));
        console.log(response);
        dispatch({
            type: GET_PROFILE_DETAIL,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
}