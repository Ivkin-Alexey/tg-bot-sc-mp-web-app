export type TCategory = "Сотрудник" | "Студент" | "Аспирант"
export type TRole = "user" | "admin" | "superAdmin"

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

export interface IUpdatedPersonData {
    chatID: number,
    data: Partial<IPerson>
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

export interface IReagentsListItem {
    reagentName: string,
    reagentAmount: string,
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


