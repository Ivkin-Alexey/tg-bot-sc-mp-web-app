import {SET_REAGENTS_APPLICATIONS, SET_REAGENTS_DATA_IS_UPDATED} from "../types.ts";

const initialState = {
    activeReagentApplications: [],
    reagentsDataIsUpdated: true
}

export const reagentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REAGENTS_APPLICATIONS:
            return {...state, activeReagentApplications: action.payload}
        case SET_REAGENTS_DATA_IS_UPDATED:
            return {...state, equipmentsDataIsUpdated: action.payload}
        default:
            return state
    }
}