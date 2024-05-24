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