import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    researches: [],
}

export const researchesSlice = createSlice({
    name: "researches",
    initialState,
    reducers: {
        setResearches: (state, {payload: list}) => state.activeReagentApplications = list,
    }
})

export const {actions, reducer} = researchesSlice