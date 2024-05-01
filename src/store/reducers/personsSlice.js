import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    newStudents: [],
    students: [],
    employees: [],
    admins: [],
    accountData: {},
    isPersonsDataUpdated: false
}

export const personsSlice = createSlice({
    name: "persons",
    initialState,
    reducers: {
        setAccountChatID: (state, {payload: accountChatID}) => state.accountChatID = accountChatID,
        setAccountData: (state, {payload: accountData}) => state.accountData = accountData,
        setStudentList: (state, {payload: list}) => {
            state.students = list
            state.newStudents = list.filter(el => el.isUserConfirmed === false)
        },
        setAdminList: (state, {payload: list}) => state.admins = list,
    }
})

export const {actions, reducer} = personsSlice