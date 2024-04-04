import {
    SET_STUDENT_LIST,
    SET_ASPIRANT_LIST,
    SET_PERSON_LIST,
    SET_ACCOUNT_DATA,
    SET_PERSONS_DATA_IS_UPDATED,
    SET_ACCOUNT_CHAT_ID,
    SET_EMPLOYEE_LIST
} from "../types.ts";

const initialState = {
    newPersons: [],
    persons: [],
    students: [],
    aspirants: [],
    newEmployees: [],
    employees: [],
    admins: [],
    accountData: {},
    accountChatID: null,
    personsDataIsUpdated: false
}

export const personsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_CHAT_ID:
            return {...state, accountChatID: action.payload}
        case SET_PERSON_LIST:
            return {...state, persons: [...action.payload], newPersons: [...action.payload.filter(el => el.isPersonConfirmed === false)]}
        case SET_STUDENT_LIST:
            return {...state, students: [...action.payload]}
            case SET_ASPIRANT_LIST:
                return {...state, aspirants: [...action.payload]}
        case SET_ACCOUNT_DATA:
            return {...state, accountData: action.payload}
        case SET_EMPLOYEE_LIST:
            return {...state, employees: [...action.payload], newEmployees: [...action.payload.filter(el => el.isPersonConfirmed === false)]}
        case SET_PERSONS_DATA_IS_UPDATED:
            return {...state, personsDataIsUpdated: action.payload}
        default:
            return state
    }
}