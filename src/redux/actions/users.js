import {deletePerson, getUsers, updatePersonData} from "../../methods/requestsToServer";
import {SET_ACCOUNT_DATA, SET_ADMIN_LIST, SET_EMPLOYEES_LIST, SET_USER_LIST, SET_USERS_DATA_IS_UPDATED} from "../types";
import constants from "../../assets/constants/constants";

const {admin, superAdmin, user} = constants.userRoles;

export function fetchUsersAction(accountChatID) {
    return async dispatch => {
        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: false});
        await getUsers()
            .then(data => setUsers(dispatch, data, accountChatID))
            .catch((e) => {
                setUsers(dispatch, [], accountChatID);
                console.log(e);
            });
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
    return updatePersonDataAction(chatID, accountChatID, formData);
}

export function setUsers(dispatch, data, accountChatID) {
    let admins = [];
    let employees = [];
    let users = [];
    let userData = {};
    data.forEach(el => {
        if (el.chatID === accountChatID) userData = el;
        if (el.role === admin || el.role === superAdmin) admins.push(el);
        if (el.role === user && el.category === "Сотрудник") employees.push(el);
        else users.push(el);
    });
    dispatch({type: SET_USER_LIST, payload: users});
    dispatch({type: SET_ACCOUNT_DATA, payload: userData});
    dispatch({type: SET_ADMIN_LIST, payload: admins});
    dispatch({type: SET_EMPLOYEES_LIST, payload: employees});
    dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: true});
}