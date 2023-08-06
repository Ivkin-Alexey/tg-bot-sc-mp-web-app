import {userProfile} from './db/userData';

export const constants = {
    pages: {
        reagents: {
            units: ['г', 'кг', 'мл', 'л'],
            tgMainButtonText: 'Отправить заявку',
            maxNumberOfReagents: 5
        },
        editPersonalData: {
            tgMainButtonText: 'Отправить данные',
        },
        application: {
            tgMainButtonText: 'Отправить данные',
        },
        equipmentCategoryList: {
            header: 'Выберите категорию:'
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
            other: {initValue: userProfile.fName || "", validateRules: []}
        },
        {
            inputAttributes: {
                name: 'lName',
                label: 'Фамилия',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: userProfile.lName || "", validateRules: []}
        },

        {
            inputAttributes: {
                name: 'patronymic',
                label: 'Отчество',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: userProfile.patronymic || "", validateRules: []}
        },
        {
            inputAttributes: {
                name: 'position',
                label: 'Должность',
                id: 'outlined-search',
                type: 'search',
                required: true
            },
            other: {initValue: userProfile.position || 'Студент', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'phone',
                label: 'Мобильный',
                id: 'outlined-helperText',
                helperText: 'Номер телефона нужен для экстренной связи',
                required: true
            },
            other: {initValue: userProfile.phone || '+7', validateRules: []}
        },
    ],
    thermalAnalysis: [
        {
            inputAttributes: {
                name: 'sampleName',
                label: 'Название образца',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'numberOfSamples',
                label: 'Количество образцов',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'speed',
                label: 'Скорость нагрева (&deg;C/мин)',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'gas',
                label: 'Газовая среда',
                helperText: 'Воздух, азот, гелий и др.',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'start',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'start',
                label: 'Конечная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        }
    ],
    furnaces: [
        {
            inputAttributes: {
                name: 'sampleName',
                label: 'Название образца',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'numberOfSamples',
                label: 'Количество образцов',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'speed',
                label: 'Скорость нагрева (&deg;C/мин)',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'gas',
                label: 'Газовая среда',
                helperText: 'Воздух, азот, гелий и др.',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'start',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'start',
                label: 'Конечная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        }
    ],
};