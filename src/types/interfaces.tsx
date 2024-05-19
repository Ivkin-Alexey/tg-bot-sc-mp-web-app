import { type } from "os"

export type TCategory = "Сотрудник" | "Студент" | "Аспирант"
export type TRole = "user" | "admin" | "superAdmin"
export type TChatID = number
export type scienceDegree = "докт. техн. наук" | "канд. техн. наук" | "без степени"

export interface IResearch {
    id: number, 
    name: string, 
    advisor: string, 
    degree: scienceDegree,
    description: string
}

export interface IPerson {
    chatID: number,
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    phone?: string,
    position?: string,
    category: TCategory,
    research: string,
    isUserConfirmed: boolean,
    otherInfo: {
        registrationDate: string,
        isUserDataSent: boolean,
    },
    requirements: [
        {
            "name": string,
            "done": boolean,
        },
        {
            "name": string,
            "done": boolean,
        },
        {
            "name": string,
            "done": boolean,
        }
    ],
    role: TRole
    studentsEducationYear?: string,
    postGraduateEducationYear?: string,
}

export interface IEquipment {
    id: string,
    category: string,
    name: string,
    brand: string,
    model: string,
    imgUrl: string,
    filesUrl: string
}

export interface IEquipmentListByCategories {
    [key: string]: IEquipment[]
}

export interface IUpdatedPersonData {
    chatID: TChatID,
    data: Partial<IPerson>
}

export interface IReagentData {
    "id": string,
    "chatID": TChatID,
    "fullName": string,
    "reagentName": string,
    "reagentAmount": string,
    "date": string,
    "status": string
}

export interface IReagentsListItem {
    reagentName: string,
    reagentAmount: string,
}

export interface IUpdatedReagentData {
    "id": string,
    "chatID"?: TChatID,
    "fullName"?: string,
    "reagentName"?: string,
    "reagentAmount"?: string,
    "date"?: string,
    "status"?: string
}

export interface ITextInputAttributes {
    inputAttributes: {
        name: string,
        label: string,
        id: TTextInputID,
        required: boolean
    },
    other: {initValue: string, validateRule: string}
}

export interface IEquipmentListItem {
    id: string,
    category: string,
    name: string,
    brand: string,
    model: string,
    imgUrl: string,
    filesUrl: string,
}

type TTextInputID = 'outlined-required' | 'outlined-helperText' | 'outlined-search';


