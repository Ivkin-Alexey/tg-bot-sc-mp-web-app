import {
    SET_USER_LIST,
    SET_ADMIN_LIST,
    SET_ACCOUNT_DATA,
    SET_USERS_DATA_IS_UPDATED,
    SET_EQUIPMENTS_DATA_IS_UPDATED,
    SET_RESEARCHES,
    SET_EQUIPMENTS,
    SET_EMPLOYEES_LIST, 
    SET_REAGENTS_DATA_IS_UPDATED, 
    SET_REAGENTS_APPLICATIONS,
    SET_OPERATING_EQUIPMENTS
} from "./types";
import constants from "../assets/constants/constants";
import {
    deletePerson,
    getUsers,
    updatePersonData,
    getResearches,
    getEquipments,
    startWorkWithEquipment, endWorkWithEquipment, updateReagentApplication, deleteReagentApplication, fetchOperatingEquipments
} from "../methods/requestsToServer";

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

export function fetchEquipmentsAction() {
    return async dispatch => {
        dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: false});
        try {
            getEquipments().then(equipmentList => setEquipments(dispatch, equipmentList));
        } catch (e) {
            console.log(e);
        }
    }
}

export function updateEquipmentWorkingStatusAction(accountChatID, accountData, equipment, type) {
    return async dispatch => {
        dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: false});
        try {
            if (type === "start") {
                startWorkWithEquipment(accountChatID, accountData, equipment).then(equipmentList => {
                    console.log(equipmentList)
                    setEquipments(dispatch, equipmentList)
                });
            } else if (type === "end") {
                endWorkWithEquipment(accountChatID, accountData, equipment).then(equipmentList => setEquipments(dispatch, equipmentList));
            }
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

export function updateReagentApplicationsAction(accountChatID, data) {
    return async dispatch => {
        dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: false});
        try {
            updateReagentApplication(accountChatID, data)
                .then(data => {
                    console.log(data);
                    dispatch({type: SET_REAGENTS_APPLICATIONS, payload: data})
                dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: true})
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export function getOperatingEquipmentsAction(accountChatID) {
    return async dispatch => {
        dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: false});
        try {
            await fetchOperatingEquipments()
                .then(data => {
                dispatch({type: SET_OPERATING_EQUIPMENTS, payload: data})
                dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: true})
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteReagentApplicationAction(accountChatID, applicationID) {
    return async dispatch => {
        dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: false});
        try {
            deleteReagentApplication(accountChatID, applicationID)
                .then(data => {
                    dispatch({type: SET_REAGENTS_APPLICATIONS, payload: data})
                    dispatch({type: SET_REAGENTS_DATA_IS_UPDATED, payload: true})
                });
        } catch (e) {
            console.log(e);
        }
    }
}

export function confirmPersonAction(chatID, accountChatID) {
    const formData = {"isUserConfirmed": true};
    return updatePersonDataAction(chatID, accountChatID, formData);
}

export function fetchResearchesAction() {
    return async dispatch => {
        dispatch({type: SET_USERS_DATA_IS_UPDATED, payload: false});
        try {
            getResearches().then(researchList => dispatch({type: SET_RESEARCHES, payload: researchList}));
        } catch (e) {
            console.log(e);
        }
    }
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

export function setEquipments(dispatch, data) {
    dispatch({type: SET_EQUIPMENTS, payload: data})
    dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: true});
}
