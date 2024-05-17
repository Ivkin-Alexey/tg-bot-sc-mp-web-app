import {SET_EQUIPMENTS, SET_EQUIPMENTS_DATA_IS_UPDATED} from "../types.ts";
import {endWorkWithEquipment, getEquipments, startWorkWithEquipment} from "../../methods/requestsToServer";


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

