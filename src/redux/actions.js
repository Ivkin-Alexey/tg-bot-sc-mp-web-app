import {
    SET_USER_LIST,
    SET_ADMIN_LIST,
    SET_ACCOUNT_DATA,
    SET_USERS_DATA_IS_UPDATED,
} from "./types";
import constants from "../assets/constants/constants";
import {deletePerson, getUsers, updatePersonData} from "../methods/requestsToServer";

const {admin, superAdmin} = constants.userRoles;

export function fetchUsersAction(accountChatID) {
    return async dispatch => {
        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: false});
        try {
            getUsers().then(data => setUsers(dispatch, data, accountChatID));
        } catch (e) {
            console.log(e);
        }
    }
}

export function deletePersonAction(chatID, accountChatID) {
    return async dispatch => {
        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: false});
        try {
            deletePerson(chatID).then(data => setUsers(dispatch, data, accountChatID));
        } catch (e) {
            console.log(e);
        }
    }
}

export function updatePersonDataAction(chatID, accountChatID, formData, queryId) {
    return async dispatch => {
        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: false});
        try {
            updatePersonData(chatID, formData, queryId).then(data => setUsers(dispatch, data, accountChatID));
        } catch (e) {
            console.log(e);
        }
    }
}

export function confirmPersonAction(chatID, accountChatID) {
    const formData = {"isUserConfirmed": true};
    updatePersonDataAction(chatID, accountChatID, formData);
}

export function setUsers(dispatch, data, accountChatID) {
    let admins = [];
    let users = [];
    let userData = {};
    data.map(el => {
        if (el.chatID === accountChatID) userData = el;
        if (el.type === admin || el.type === superAdmin) admins.push(el);
        else users.push(el);
    });
    dispatch({type: SET_USER_LIST, payload: users});
    dispatch({type: SET_ACCOUNT_DATA, payload: userData});
    dispatch({type: SET_ADMIN_LIST, payload: admins});
    dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: true});
}
