import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    equipments: [],
    categories: [],
    operatingEquipments: [],
    equipmentsDataIsUpdated: false,
}

export const equipmentsSlice = createSlice({
    name: "equipments",
    initialState,
    reducers: {
        setEquipmentList: (state, {payload: list}) => state.equipments = list,
        setCategories: (state, {payload: list}) => state.categories = list,
        setOperatingEquipmentList: (state, {payload: list}) => state.operatingEquipments = list,
        setEquipmentsDataIsUpdated: (state, {payload: isUpdated}) => state.equipmentsDataIsUpdated = isUpdated,
    }
})

export const {actions, reducer} = equipmentsSlice