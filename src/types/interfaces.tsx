export interface ITextInputAttributes {
    inputAttributes: {
        name: string,
        label: string,
        id: TTextInputID,
        required: boolean
    },
    other: {initValue: string, validateRules: string[]}
}

export interface IReagentsListItem {
    reagentName: string,
    reagentAmount: string,
}

type TTextInputID = 'outlined-required' | 'outlined-helperText' | 'outlined-search';


