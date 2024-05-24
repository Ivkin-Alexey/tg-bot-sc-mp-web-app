import { TChatID } from "./main"

export interface IEquipment {
    id: string,
    category: string,
    name: string,
    brand: string,
    model: string,
    imgUrl: string,
    filesUrl: string
}

export interface IOperatingEquipment extends IEquipment {
    chatID: TChatID,
    startTime: string,
    startDate: string,
    isLongUse: boolean,
}

export interface IEquipmentListByCategories {
    [key: string]: IEquipment[]
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