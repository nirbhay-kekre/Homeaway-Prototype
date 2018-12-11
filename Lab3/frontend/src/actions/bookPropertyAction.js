import { BOOK_PROPERTY_SUCCESS, BOOK_PROPERTY_FAIL, USER_AUTH_FAIL } from './types'
import axios from 'axios';
import getURL from './url';
import { ApolloService } from './../graphql/ApolloClient';
import Mutation from './../graphql/mutation';

export const bookPropertyAction = (propertyDetails) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        let response = null;
        try {
            console.log("booking..")
            response = await ApolloService.mutate({
                variables: {
                    ...propertyDetails
                },
                mutation: Mutation.BOOK_PROPERTY
            })
            console.log(response);
            if(response.data.bookProperty.statusCode === 200){
                if (response.data.bookProperty.success) {
                    dispatch({
                        type: BOOK_PROPERTY_SUCCESS,
                        payload: response
                    });
                    resolve(response);
                }else{
                    dispatch({
                        type: BOOK_PROPERTY_FAIL,
                        payload: response
                    });
                    reject(response.data.bookProperty.message);
                }
            } else if(response.data.bookProperty.statusCode === 401){
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("loggedInUser");
                dispatch({
                    type: USER_AUTH_FAIL
                });
            }
            
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
                reject("Server is down!");
                error = {
                    data: {
                        bookProperty:{
                            success: false,
                            message: "Server is down!"
                        }
                    }
                }
                dispatch({
                    type: BOOK_PROPERTY_FAIL,
                    payload: error
                });
                reject(error.data.bookProperty);
            }
            else{
                console.log(error);
                reject(error);
            }
        }
    });
}