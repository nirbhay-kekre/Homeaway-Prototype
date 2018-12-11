import { USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';
import { ApolloService } from './../graphql/ApolloClient';
import Mutation from './../graphql/mutation';

export const sendMessageAction = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            let response = await ApolloService.mutate({
                variables: {
                    ...data
                },
                mutation: Mutation.SEND_MESSAGE
            })
            if (response.data.sendMessage.statusCode === 200 && response.data.sendMessage.success === true) {
                resolve(response);
            }else if(response.data.sendMessage.statusCode === 401){
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
                reject(response);
            }else{
                reject(response);
            }
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            } 
            reject(error);
        }
    });
}