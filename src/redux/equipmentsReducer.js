import {SET_EQUIPMENTS, SET_EQUIPMENTS_DATA_IS_UPDATED} from "./types";

const initialState = {
    equipments: [],
    categories: [],
    operatingEquipment: [],
    equipmentsDataIsUpdated: false,
}

export const equipmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EQUIPMENTS:
            const list = action.payload;
            console.log(list);
            let operatingList = [];
            return {...state, equipments: list, categories: Object.keys(list), operatingEquipment: operatingList}
        case SET_EQUIPMENTS_DATA_IS_UPDATED:
            return {...state, equipmentsDataIsUpdated: action.payload}
        default:
            return state
    }
}