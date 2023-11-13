import {SET_EQUIPMENTS, SET_EQUIPMENTS_CATEGORIES} from "./types";

const initialState = {
    equipments: [],
    categories: [],
}

export const equipmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EQUIPMENTS:
            return {...state, equipments: action.payload}
        case SET_EQUIPMENTS_CATEGORIES:
            return {...state, categories: action.payload}
        default:
            return state
    }
}