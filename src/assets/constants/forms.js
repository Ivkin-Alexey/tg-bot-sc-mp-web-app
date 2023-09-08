import {userProfile} from "../db/userData";

const forms = {
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
            other: {initValue: 'Воздух', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'startTemperature',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'endTemperature',
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
            other: {initValue: 'Воздух', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'startTemperature',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        },
        {
            inputAttributes: {
                name: 'endTemperature',
                label: 'Конечная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '', validateRules: []}
        }
    ],
    reagentsFormItem: [
        {
            inputAttributes: {
                name: 'reagentName',
                label: 'Название вещества',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: []}
        },
        {
            inputAttributes: {
                name: 'reagentAmount',
                label: 'Количество',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: []}
        },
    ],
};

export default forms;