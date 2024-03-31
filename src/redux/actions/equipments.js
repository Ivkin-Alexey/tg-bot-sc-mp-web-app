import {SET_EQUIPMENTS, SET_EQUIPMENTS_DATA_IS_UPDATED} from "../types";
import {endWorkWithEquipment, getEquipments, startWorkWithEquipment} from "../../methods/requestsToServer";

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

export function setEquipments(dispatch, data) {
    dispatch({type: SET_EQUIPMENTS, payload: data})
    dispatch({type: SET_EQUIPMENTS_DATA_IS_UPDATED, payload: true});
}

