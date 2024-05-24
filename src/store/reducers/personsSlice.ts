import {createSlice} from "@reduxjs/toolkit";
import { IPerson } from "../../models/interfaces";

interface IPersonsState {
    accountData: IPerson | null
}

const initialState: IPersonsState = {
    accountData: null,
}

export const personsSlice = createSlice({
    name: "persons",
    initialState,
    reducers: {
        setAccountData: (state, {payload: accountData}) => state.accountData = accountData,
    }
})

export const {actions, reducer} = personsSlice