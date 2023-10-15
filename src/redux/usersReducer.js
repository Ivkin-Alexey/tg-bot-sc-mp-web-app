import {SET_USER_LIST, SET_ADMIN_LIST, SET_ACCOUNT_DATA} from "./types";

const initialState = {
    users: [],
    admins: [],
    accountData: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LIST:
            return {...state, users: [...action.payload]}
        case SET_ACCOUNT_DATA:
            return {...state, accountData: action.payload}
        case SET_ADMIN_LIST:
            return {...state, admins: [...action.payload]}
        default:
            return state
    }
}