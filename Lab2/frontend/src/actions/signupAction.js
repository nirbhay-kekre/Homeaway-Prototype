import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types'
import axios from 'axios';
import getURL from './url';

export const signupAction = (signUpForm) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        let response = null;
        let message = validateSignUpForm(signUpForm);
        if (message) {
            let error = {
                response: {
                    data: {
                        success: false,
                        message
                    }
                }
            };
            dispatch({
                type: SIGNUP_FAIL,
                payload: error
            });
            reject(error);
        } else {
            try {
                console.log("Signing up")
                response = await axios.post(getURL("signup"), signUpForm);
                console.log("signUp response");
                console.log(response);
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: response
                });
                resolve(response);
            } catch (error) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error
                });
                reject(error);
            }
        }
    });
}

const validateSignUpForm = (signUpForm) => {
    let msg = "";
    if (!signUpForm.username) {
        msg += "An Email address is required.\n"
    }
    if (!signUpForm.password) {
        msg += "A Password is required.\n"
    } else {
        if (!signUpForm.password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{1,}$/)) {
            msg += "Your Password must contain at least 1 number and 1 letter.\n"
        }
        if (!signUpForm.password.match(/^.{7,32}$/)) {
            msg += "Your Password must be between 7 and 32 characters.\n"
        }
    }
    if (!signUpForm.firstname) {
        msg += "First name is required.\n"
    }
    if (!signUpForm.lastname) {
        msg += "Last name is required.\n"
    }
    return msg;
}