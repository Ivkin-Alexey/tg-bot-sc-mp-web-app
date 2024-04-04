import {SET_EQUIPMENTS, SET_EQUIPMENTS_DATA_IS_UPDATED, SET_OPERATING_EQUIPMENTS} from "../types.ts";

const initialState = {
    equipments: [],
    categories: [],
    operatingEquipments: [],
    equipmentsDataIsUpdated: false,
}

export const equipmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EQUIPMENTS:
            const list = action.payload;
            return {...state, equipments: list, categories: Object.keys(list)}
        case SET_EQUIPMENTS_DATA_IS_UPDATED:
            return {...state, equipmentsDataIsUpdated: action.payload}
        case SET_OPERATING_EQUIPMENTS:
            return {...state, operatingEquipments: action.payload}
        default:
            return state
    }
}