import {deletePerson, getPersons, updatePersonData} from "../../methods/requestsToServer";
import {SET_ACCOUNT_DATA, SET_ADMIN_LIST, SET_PERSON_LIST, SET_STUDENT_LIST, SET_PERSONS_DATA_IS_UPDATED, SET_ASPIRANT_LIST, SET_EMPLOYEE_LIST} from "../types.ts";
import constants from "../../assets/constants/constants";

export function fetchPersonsAction(accountChatID) {
    return async dispatch => {
        dispatch({type: SET_PERSONS_DATA_IS_UPDATED, payload: false});
        await getPersons()
            .then(data => setPersonList(dispatch, data, accountChatID))
            .catch((e) => {
                setPersonList(dispatch, [], accountChatID);
                console.log(e);
            });
    }
}

export function deletePersonAction(chatID, accountChatID) {
    return async dispatch => {
        dispatch({type: SET_PERSONS_DATA_IS_UPDATED, payload: false});
        try {
            deletePerson(chatID).then(data => setPersonList(dispatch, data, accountChatID));
        } catch (e) {
            console.log(e);
        }
    }
}

export function updatePersonDataAction(chatID, accountChatID, formData, queryId) {
    return async dispatch => {
        dispatch({type: SET_PERSONS_DATA_IS_UPDATED, payload: false});
        try {
            updatePersonData(chatID, formData, queryId).then(data => setPersonList(dispatch, data, accountChatID));
        } catch (e) {
            console.log(e);
        }
    }
}

export function confirmPersonAction(chatID, accountChatID) {
    const formData = {"isPersonConfirmed": true};
    return updatePersonDataAction(chatID, accountChatID, formData);
}

export function setPersonList(dispatch, data, accountChatID) {
    let admins = [];
    let students = [];
    let aspirants = [];
    let employees = [];
    let personData = {};
    let wrongPersonData = [];
    data.forEach(el => {
        if (el.chatID === accountChatID) personData = el;
        if (el.category === "employee") employees.push(el);
        if (el.category === "student") students.push(el);
        if (el.category === "aspirant") aspirants.push(el);
        else wrongPersonData.push(el);
    });
    console.log(data)
    dispatch({type: SET_ACCOUNT_DATA, payload: personData});
    dispatch({type: SET_PERSON_LIST, payload: data});
    dispatch({type: SET_ADMIN_LIST, payload: admins});
    dispatch({type: SET_STUDENT_LIST, payload: students});
    dispatch({type: SET_ASPIRANT_LIST, payload: aspirants});
    dispatch({type: SET_EMPLOYEE_LIST, payload: employees});
    dispatch({type: SET_PERSONS_DATA_IS_UPDATED, payload: true});
}