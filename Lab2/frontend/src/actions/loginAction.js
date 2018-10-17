import { LOGIN_SUCCESS, LOGIN_FAIL } from './types'
import axios from 'axios';

export const loginAction = (credential) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        response = await axios.post("http://localhost:3001/login", credential);
        console.log("Login response");
        console.log(response);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
    resolve()});
}