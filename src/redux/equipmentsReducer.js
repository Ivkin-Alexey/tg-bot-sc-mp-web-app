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
            let operatingList = [];
            for(let category in list) {
                list[category].forEach(el => {
                    if(el.isUsing.length > 0) operatingList.push(el);
                })
            }
            return {...state, equipments: list, categories: Object.keys(list), operatingEquipment: operatingList}
        case SET_EQUIPMENTS_DATA_IS_UPDATED:
            return {...state, equipmentsDataIsUpdated: action.payload}
        default:
            return state
    }
}