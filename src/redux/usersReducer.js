import {FETCH_USERS, SET_USER_DATA} from "./types";

const initialState = {
    users: [],
    userData: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, users: [...action.payload]}
        case SET_USER_DATA:
            return {...state, userData: action.payload}
        default:
            return state
    }
}