import getURL from "./url";
import { GET_PROFILE_DETAIL, UPDATE_PROFILE, USER_AUTH_FAIL } from './types';
import axios from 'axios';
import { ApolloService } from './../graphql/ApolloClient';
import Queries from './../graphql/query';
import Mutation from './../graphql/mutation';

export const fetchProfileDetailAction = (username) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        response = await ApolloService.query({
            variables: {
                username
            },
            query: Queries.GET_PROFILE
        })
        console.log(response);
        if (response.data.profile.statusCode === 200 && response.data.profile.success === true) {
            dispatch({
                type: GET_PROFILE_DETAIL,
                payload: response
            })
        }else if (response.data.history.statusCode === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("loggedInUser");
            dispatch({
                type: USER_AUTH_FAIL
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProfileAction = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        // axios.defaults.withCredentials = true;
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        try {
            let response = await ApolloService.mutate({
                variables: {
                    ...data
                },
                mutation: Mutation.UPDATE_PROFILE
            })
            if (response.data.updateProfile.statusCode === 200 && response.data.updateProfile.success === true) {
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: response,
                });
                resolve(response);
            }
            else if (response.data.updateProfile.statusCode === 401) {
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
            console.log(error);
            reject(error);
        }
    })

}