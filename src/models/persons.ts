import { TCategory, TChatID, TRole } from "./main"

export interface IPerson {
    chatID: TChatID,
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

export interface IUpdatedPersonData {
    chatID: TChatID,
    data: Partial<IPerson>
}