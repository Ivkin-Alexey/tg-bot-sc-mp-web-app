export interface ITextInputAttributes {
    inputAttributes: {
        name: string,
        label: string,
        id: TTextInputID,
        required: boolean
    },
    other: {initValue: string, validateRule: string}
}

type TTextInputID = 'outlined-required' | 'outlined-helperText' | 'outlined-search';