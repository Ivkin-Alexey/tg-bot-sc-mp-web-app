export const constants = {
    pages: {
        reagents: {
            units: ['г', 'кг', 'мл', 'л'],
            tgMainButtonText: 'Отправить заявку',
            maxNumberOfReagents: 5
        },
        editPersonalData: {
            tgMainButtonText: 'Отправить данные',
        }
    },
    components: {},
};

export const forms = {
    editPersonalData: [
        {
            inputAttributes: {
                name: 'fName',
                label: 'Имя',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'lName',
                label: 'Фамилия',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },

        {
            inputAttributes: {
                name: 'patronymic',
                label: 'Отчество',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'position',
                label: 'Должность',
                id: 'outlined-search',
                type: 'search',
                required: true
            },
            other: {initValue: 'Студент', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'phone',
                label: 'Мобильный',
                id: 'outlined-helperText',
                helperText: 'Номер телефона нужен для экстренной связи',
                required: true
            },
            other: {initValue: '+7', validateRules: []}
        },
    ],
};