import {SET_EQUIPMENTS, SET_EQUIPMENTS_DATA_IS_UPDATED, SET_OPERATING_EQUIPMENTS} from "../types.ts";
import {endWorkWithEquipment, getEquipments, startWorkWithEquipment, fetchOperatingEquipments} from "../../methods/requestsToServer";

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

export function setEquipments(dispatch, data) {
    dispatch({type: SET_EQUIPMENTS, payload: data})
    dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: true});
}

