import localisations from "../constants/localisations";
const {
    studentsEducationYearList,
    postGraduatesEducationYearList,
    positionList
} = localisations.components.form;

const forms = {
    editPersonalData: [
        {
            inputAttributes: {
                name: 'firstName',
                label: 'Имя',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: []}
        },
        {
            inputAttributes: {
                name: 'lastName',
                label: 'Фамилия',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: []}
        },

        {
            inputAttributes: {
                name: 'patronymic',
                label: 'Отчество',
                id: 'outlined-required',
                required: false
            },
            other: {initValue: "", validateRules: []}
        },
        {
            inputAttributes: {
                name: 'position',
                label: 'Должность',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: positionList[0].value, validateRules: [], selectOptions: positionList}
        },
        {
            inputAttributes: {
                name: 'studentsEducationYear',
                label: 'Курс',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: studentsEducationYearList[0].value, validateRules: [], selectOptions: studentsEducationYearList}
        },
        {
            inputAttributes: {
                name: 'postGraduateEducationYear',
                label: 'Курс',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: postGraduatesEducationYearList[0].value, validateRules: [], selectOptions: postGraduatesEducationYearList}
        },
        {
            inputAttributes: {
                name: 'research',
                label: 'Научное направление',
                id: 'outlined-search',
                type: 'search',
                required: true
            },
            other: {initValue: '', validateRules: []}
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