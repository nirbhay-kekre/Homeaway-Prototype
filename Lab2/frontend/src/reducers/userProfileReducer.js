import { GET_PROFILE_DETAIL, UPDATE_PROFILE } from '../actions/types';
import Default_profile_Pic from './../components/profile/default-profile-pic.png'

const initialState = {
    profile: {
        firstname: "",
        lastname: "",
        aboutme: "",
        city: "",
        company: "",
        school: "",
        hometown: "",
        languages: "",
        profilefilepath: Default_profile_Pic,
        createdOn: "The beginning",
        gender: "",
        phone: "",
    }
}

export default function (state = initialState, action) {
    let profile = null;
    switch (action.type) {
        case GET_PROFILE_DETAIL:
            profile = {
                ...state.profile,
                ...action.payload.data,
                profilefilepath: action.payload.data.profilefilepath ? action.payload.data.profilefilepath : Default_profile_Pic,
                createdOn: action.payload.data.createdOn ? new Date(action.payload.data.createdOn).getFullYear() : "The beginning"
            }
            return {
                ...state,
                profile
            }
        case UPDATE_PROFILE:
            profile = {
                ...state.profile,
                ...action.payload.data,
                profilefilepath: action.payload.data.profilefilepath ? action.payload.data.profilefilepath : Default_profile_Pic,
            }
            return {
                ...state,
                profile
            }
        default: return state;
    }
}