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


