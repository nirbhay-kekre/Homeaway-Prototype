import {
    UPDATE_AMENITIES, CHANGE_TAB,
    UPDATE_AVAILABILITY, UPDATE_BOOKING_OPTION,
    UPDATE_DETAILS, UPDATE_LOCATION,
    UPDATE_PHOTOS, UPDATE_PRICE,
    PROPERTY_POSTED, USER_AUTH_FAIL
} from './types';
import axios from 'axios';
import getURL from './url';

export const updateAmenitiesAction = (amenities, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_AMENITIES,
        payload: amenities
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updateAvailabilityAction = (availability, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_AVAILABILITY,
        payload: availability
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updateBookingOptionAction = (bookingOptions, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_BOOKING_OPTION,
        payload: bookingOptions
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updateDetailsAction = (details, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_DETAILS,
        payload: details
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updateLocationAction = (location, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_LOCATION,
        payload: location
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updatePhotosAction = (photos, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_PHOTOS,
        payload: photos
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const updatePriceAction = (price, nextTab) => (dispatch) => {
    dispatch({
        type: UPDATE_PRICE,
        payload: price
    });
    if (nextTab) {
        dispatch({
            type: CHANGE_TAB,
            payload: nextTab
        })
    }
}

export const changeTab = (nextTab) => (dispatch) => {
    dispatch({
        type: CHANGE_TAB,
        payload: nextTab
    })
}

export const submitPropertyAction = (fdata) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios.defaults.withCredentials = true;
        //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        try {
            let response = await axios.post(getURL("/property/create"), fdata, {
                headers: {
                    //"X-Requested-With": "XMLHttpRequest",
                    'Authorization': localStorage.getItem('jwtToken'),
                    'Content-Type': 'multipart/form-data' 
                },
            });
            dispatch({
                type: PROPERTY_POSTED,
            });
            resolve(response);
        } catch (error) {
            if (error.message === "Network Error") {
                console.log("Server is down!");
                reject("Server is down!");
                error.response = {
                    data: {
                        success: false,
                        message: "Server is down!"
                    }
                }
            }
            else {
                if (error.response.status === 401) {
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("loggedInUser");
                    dispatch({
                        type: USER_AUTH_FAIL
                    });
                }
            }
            reject(error);
        }
    });
}


