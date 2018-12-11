import { USER_AUTH_FAIL, CONVERSATION_GET, CONVERSATION_CLEAR } from './types'
import axios from 'axios';
import getURL from './url';
import Queries from './../graphql/query';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// apollo client setup


export const getMessageAction = () => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        try {
            const access_token = localStorage.getItem("jwtToken");
            const headers = {
                authorization: access_token ? access_token : null
            };
            const httpLink = new createHttpLink({
                uri: 'http://localhost:3001/homeaway_api',
                headers
            });
            const ApolloService = new ApolloClient({
                link: httpLink,
                cache: new InMemoryCache()
            })
            let response = await ApolloService.query({
                query: Queries.GET_MESSAGE
            });
            if (response.data.getMessage.statusCode === 200 && response.data.getMessage.success === true) {
                dispatch({
                    type: CONVERSATION_GET,
                    payload: response
                });
                resolve(response);
            } else if (response.data.getMessage.statusCode === 401) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
                dispatch({
                    type: CONVERSATION_CLEAR,
                });
            }
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
            }
            dispatch({
                type: CONVERSATION_CLEAR,
            });
            reject(error);
        }
    });
}