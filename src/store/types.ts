export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_ACCOUNT_DATA = 'SET_ACCOUNT_DATA';
export const SET_ACCOUNT_CHAT_ID = 'SET_ACCOUNT_CHAT_ID';
export const SET_ADMIN_LIST = 'SET_ADMIN_LIST';
export const SET_RESEARCHES = 'SET_RESEARCHES';
export const SET_EQUIPMENTS = 'SET_EQUIPMENTS';
export const SET_USERS_DATA_IS_UPDATED = 'SET_USERS_DATA_IS_UPDATED';
export const SET_EQUIPMENTS_DATA_IS_UPDATED = 'SET_EQUIPMENTS_DATA_IS_UPDATED';
export const SET_EMPLOYEES_LIST = 'SET_EMPLOYEES_LIST';
export const SET_REAGENTS_APPLICATIONS = 'SET_REAGENTS_APPLICATIONS';
export const SET_REAGENTS_DATA_IS_UPDATED = 'SET_REAGENTS_DATA_IS_UPDATED';

export interface IState {
    users: IUsersState,
    researches: IResearchesState,
    equipments: IEquipmentsState,
    reagents: IReagentsState
}

export type IUsersState = {
    newUsers: [],
    users: [],
    newEmployees: [],
    employees: [],
    admins: [],
    accountData: {},
    accountChatID: string | null,
    usersDataIsUpdated: boolean
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