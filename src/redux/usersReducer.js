import {SET_USER_LIST, SET_ADMIN_LIST, SET_ACCOUNT_DATA, SET_USERS_DATA_IS_UPDATED} from "./types";

const initialState = {
    users: [],
    admins: [],
    accountData: {},
    usersDataIsUpdated: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LIST:
            return {...state, users: [...action.payload]}
        case SET_ACCOUNT_DATA:
            return {...state, accountData: action.payload}
        case SET_ADMIN_LIST:
            return {...state, admins: [...action.payload]}
        case SET_USERS_DATA_IS_UPDATED:
            return {...state, usersDataIsUpdated: action.payload}
        default:
            return state
    }
}