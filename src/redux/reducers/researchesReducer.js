import {SET_RESEARCHES} from "../types.ts";

const initialState = {
    researches: [],
}

export const researchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESEARCHES:
            return {...state, researches: action.payload}
        default:
            return state
    }
}