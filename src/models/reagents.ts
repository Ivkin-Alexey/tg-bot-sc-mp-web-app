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