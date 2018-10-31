import {
    UPDATE_AMENITIES, CHANGE_TAB,
    UPDATE_LOCATION, UPDATE_DETAILS,
    UPDATE_BOOKING_OPTION, UPDATE_PHOTOS,
    UPDATE_PRICE, UPDATE_AVAILABILITY,
    PROPERTY_POSTED
} from "../actions/types";

const initialState = {
    currentTab: "location",
    location: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    },
    details: {
        headline: "",
        propertyDescription: "",
        propertyType: "",
        bedroom: "",
        bathroom: "",
        accomodates: "",
    },
    bookingOptions: {
        bookingOption: ""
    },
    photos: {
        propertyPhoto: []
    },
    previewPhotos: [],
    amenities: {
        amenity: [],
        other: "",
    },
    pricing: {
        oneNightRate: "",
        minNightStay: "",
    },
    availablity: {
        startDate: "",
        endDate: ""
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_AMENITIES:
            return {
                ...state,
                amenities: action.payload
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case UPDATE_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case UPDATE_BOOKING_OPTION:
            return {
                ...state,
                bookingOptions: action.payload
            }
        case UPDATE_PHOTOS:
            return {
                ...state,
                previewPhotos: action.payload.previewPhotos,
                photos: {
                    propertyPhoto: action.payload.propertyPhoto
                }
            }
        case UPDATE_PRICE:
            return {
                ...state,
                pricing: action.payload
            }
        case CHANGE_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        case UPDATE_AVAILABILITY:
            return {
                ...state,
                availablity: action.payload
            }
        case PROPERTY_POSTED:
            return initialState;//reset on success
        default: return state;
    }
}