import { LOGIN_SUCCESS, LOGIN_FAIL } from './types'
import axios from 'axios';
import getURL from './url';
import {ApolloService} from './../graphql/ApolloClient';
import Mutation from './../graphql/mutation'

export const loginAction = (credential) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        //response = await axios.post(getURL("login"), credential);
        response = await ApolloService.mutate({
            variables: {
                ...credential
            },
            mutation: Mutation.LOGIN
        })
        console.log("Login response");
        console.log(response);
        
        if(response.data.login.statusCode ===200 && response.data.login.success === true){
            localStorage.setItem("loggedInUser", JSON.stringify({
                username: response.data.login.username,
                firstname: response.data.login.firstname,
                lastname: response.data.login.lastname,
                role: response.data.login.role
            }));
            localStorage.setItem("jwtToken", response.data.login.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response
            })
        }
        else{
            dispatch({
                type: LOGIN_FAIL,
                payload: response
            })
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
    resolve()});
}