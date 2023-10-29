import localisations from "../constants/localisations";
import {validateRules} from "../constants/validateRules";
import {researchesSelectOptions} from "../db/db";

const {cyrillicTextOnly, phone, spaceBetweenWordsOnly} = validateRules;

const {
    studentsEducationYearList,
    postGraduatesEducationYearList,
    positionList,
} = localisations.components.form;

const forms = {
    editStudentPersonalData: [
        {
            inputAttributes: {
                name: 'firstName',
                label: 'Имя',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },
        {
            inputAttributes: {
                name: 'lastName',
                label: 'Фамилия',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },

        {
            inputAttributes: {
                name: 'patronymic',
                label: 'Отчество',
                id: 'outlined-basic',
                required: false
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },
        {
            inputAttributes: {
                name: 'position',
                label: 'Должность',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: positionList[0].value, validateRules: [cyrillicTextOnly, spaceBetweenWordsOnly], selectOptions: positionList}
        },
        {
            inputAttributes: {
                name: 'studentsEducationYear',
                label: 'Курс',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: studentsEducationYearList[0].value, validateRules: [spaceBetweenWordsOnly], selectOptions: studentsEducationYearList}
        },
        {
            inputAttributes: {
                name: 'postGraduateEducationYear',
                label: 'Курс',
                select: true,
                id: 'outlined-select-currency',
                required: true,
            },
            other: {initValue: postGraduatesEducationYearList[0].value, validateRules: [spaceBetweenWordsOnly], selectOptions: postGraduatesEducationYearList}
        },
        {
            inputAttributes: {
                name: 'research',
                label: 'Научное направление',
                select: true,
                id: 'outlined-select-currency',
                required: true
            },
            other: {initValue: researchesSelectOptions[0].value, validateRules: [cyrillicTextOnly, spaceBetweenWordsOnly], selectOptions: researchesSelectOptions}
        },
        {
            inputAttributes: {
                name: 'phone',
                label: 'Мобильный',
                id: 'outlined-helperText',
                required: true
            },
            other: {initValue: '+7', validateRules: [phone]}
        },
    ],
    editAdminPersonalData: [
        {
            inputAttributes: {
                name: 'firstName',
                label: 'Имя',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },
        {
            inputAttributes: {
                name: 'lastName',
                label: 'Фамилия',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },

        {
            inputAttributes: {
                name: 'patronymic',
                label: 'Отчество',
                id: 'outlined-basic',
                required: false
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly]}
        },
        {
            inputAttributes: {
                name: 'position',
                label: 'Должность',
                id: 'outlined-required',
                required: true,
            },
            other: {initValue: "", validateRules: [cyrillicTextOnly, spaceBetweenWordsOnly]}
        },
        {
            inputAttributes: {
                name: 'research',
                label: 'Научное направление',
                id: 'outlined-select-currency',
                select: true,
                required: true
            },
            other: {initValue: researchesSelectOptions[0].value, validateRules: [cyrillicTextOnly, spaceBetweenWordsOnly], selectOptions: researchesSelectOptions}
        },
        {
            inputAttributes: {
                name: 'phone',
                label: 'Мобильный',
                id: 'outlined-helperText',
                required: true
            },
            other: {initValue: '+7', validateRules: [phone]}
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
            other: {initValue: ''}
        },
        {
            inputAttributes: {
                name: 'numberOfSamples',
                label: 'Количество образцов',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: ''}
        },
        {
            inputAttributes: {
                name: 'speed',
                label: 'Скорость нагрева (&deg;C/мин)',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'gas',
                label: 'Газовая среда',
                helperText: 'Воздух, азот, гелий и др.',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: 'Воздух',}
        },
        {
            inputAttributes: {
                name: 'startTemperature',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'endTemperature',
                label: 'Конечная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
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
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'numberOfSamples',
                label: 'Количество образцов',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'speed',
                label: 'Скорость нагрева (&deg;C/мин)',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'gas',
                label: 'Газовая среда',
                helperText: 'Воздух, азот, гелий и др.',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: 'Воздух',}
        },
        {
            inputAttributes: {
                name: 'startTemperature',
                label: 'Начальная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
        },
        {
            inputAttributes: {
                name: 'endTemperature',
                label: 'Конечная температура анализа',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: '',}
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
            other: {initValue: "",}
        },
        {
            inputAttributes: {
                name: 'reagentAmount',
                label: 'Количество',
                id: 'outlined-required',
                required: true
            },
            other: {initValue: "",}
        },
    ],
};

export default forms;