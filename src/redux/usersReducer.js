import {SET_USER_LIST, SET_ADMIN_LIST, SET_ACCOUNT_DATA, SET_USERS_DATA_IS_UPDATED, SET_ACCOUNT_CHAT_ID} from "./types";

const initialState = {
    newUsers: [],
    users: [],
    admins: [],
    accountData: {},
    accountChatID: null,
    usersDataIsUpdated: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_CHAT_ID:
            return {...state, accountChatID: action.payload}
        case SET_USER_LIST:
            return {...state, users: [...action.payload], newUsers: [...action.payload.filter(el => el.isUserConfirmed === false)]}
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