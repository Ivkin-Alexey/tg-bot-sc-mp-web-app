import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeReagentApplications: [],
    reagentsDataIsUpdated: true
}

export const reagentsSlice = createSlice({
    name: "reagents",
    initialState,
    reducers: {
        setReagentApps: (state, {payload: list}) => state.activeReagentApplications = list,
        setReagentsIsUpdated: (state, {payload: isUpdated}) => state.reagentsDataIsUpdated = isUpdated,
    }
})

export const {actions, reducer} = reagentsSlice
