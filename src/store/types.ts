export const SET_PERSON_LIST = 'SET_PERSON_LIST';
export const SET_ACCOUNT_DATA = 'SET_ACCOUNT_DATA';
export const SET_ACCOUNT_CHAT_ID = 'SET_ACCOUNT_CHAT_ID';
export const SET_ADMIN_LIST = 'SET_ADMIN_LIST';
export const SET_STUDENT_LIST = 'SET_STUDENT_LIST';
export const SET_ASPIRANT_LIST = 'SET_ASPIRANT_LIST';
export const SET_RESEARCHES = 'SET_RESEARCHES';
export const SET_EQUIPMENTS = 'SET_EQUIPMENTS';
export const SET_PERSONS_DATA_IS_UPDATED = 'SET_PERSONS_DATA_IS_UPDATED';
export const SET_OPERATING_EQUIPMENTS = 'SET_PERSONS_DATA_IS_UPDATED';
export const SET_EQUIPMENTS_DATA_IS_UPDATED = 'SET_EQUIPMENTS_DATA_IS_UPDATED';
export const SET_EMPLOYEE_LIST = 'SET_EMPLOYEE_LIST';
export const SET_REAGENTS_APPLICATIONS = 'SET_REAGENTS_APPLICATIONS';
export const SET_REAGENTS_DATA_IS_UPDATED = 'SET_REAGENTS_DATA_IS_UPDATED';

export type IPersonsState = {
    newPersons: [],
    persons: [],
    newEmployees: [],
    employees: [],
    admins: [],
    accountData: {},
    accountChatID: string | null,
    personsDataIsUpdated: boolean
}

export interface IResearchesState {
    researches: [],
}

export interface IEquipmentsState {
    equipments: [],
    categories: [],
    operatingEquipment: [],
    equipmentsDataIsUpdated: boolean,
}

export interface IReagentsState {
    activeReagentApplications: [],
    reagentsDataIsUpdated: boolean
}