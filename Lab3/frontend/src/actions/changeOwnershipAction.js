import { CHANGE_TO_OWNER_SUCCESS, USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';
import { ApolloService } from './../graphql/ApolloClient';
import Mutation from './../graphql/mutation';

export const changeOwnershipAction = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        let response = null;
        try {
            console.log("making you owner")

            response = await ApolloService.mutate({
                mutation: Mutation.MAKE_ME_OWNER
            })
            console.log("change to Owner response");
            console.log(response);
            if (response.data.makeMeOwner.statusCode === 200 && response.data.makeMeOwner.success === true) {

                localStorage.setItem("loggedInUser", JSON.stringify({
                    username: response.data.makeMeOwner.username,
                    firstname: response.data.makeMeOwner.firstname,
                    lastname: response.data.makeMeOwner.lastname,
                    role: response.data.makeMeOwner.role
                }));
                localStorage.setItem("jwtToken", response.data.token);
                dispatch({
                    type: CHANGE_TO_OWNER_SUCCESS,
                    payload: response
                })
            } else if (response.data.properties.statusCode === 401) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
            }
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
        }
        resolve()
    });
}