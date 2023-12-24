import {SET_EQUIPMENTS, SET_EQUIPMENTS_CATEGORIES, SET_EQUIPMENTS_DATA_IS_UPDATED} from "./types";

const initialState = {
    equipments: [],
    categories: [],
    equipmentsDataIsUpdated: false,
}

export const equipmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EQUIPMENTS:
            return {...state, equipments: action.payload}
        case SET_EQUIPMENTS_CATEGORIES:
            return {...state, categories: action.payload}
        case SET_EQUIPMENTS_DATA_IS_UPDATED:
            return {...state, equipmentsDataIsUpdated: action.payload}
        default:
            return state
    }
}