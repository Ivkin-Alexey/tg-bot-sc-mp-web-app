import {researchesSelectOptions} from "../../db/db";
import localisations from "../localisations/localisations";

const {
    studentsEducationYearList,
    postGraduatesEducationYearList,
    categoryList,
} = localisations.components.form;

const personalData = {
    firstName: {
        label: 'Имя',
        id: 'outlined-required',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly", {"minLength": 2}, {"maxLength": 30}]
    },
    lastName: {
        label: 'Фамилия',
        id: 'outlined-required',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly"]
    },
    patronymic: {
        label: 'Отчество',
        id: 'outlined-basic',
        required: false,
        initValue: "",
        validateRules: ["cyrillicTextOnly"]
    },
    position: {
        label: 'Должность',
        id: 'outlined-basic',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly", "spaceBetweenWordsOnly"],
    },
    studentsEducationYear: {
        label: 'Курс',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: studentsEducationYearList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: studentsEducationYearList
    },
    category: {
        label: 'Категория',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: categoryList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: categoryList
    },
    postGraduateEducationYear: {
        label: 'Курс',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: postGraduatesEducationYearList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: postGraduatesEducationYearList
    },
    research: {
        label: 'Научное направление',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: researchesSelectOptions[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: researchesSelectOptions
    },
    phone: {
        label: 'Мобильный',
        id: 'outlined-helperText',
        required: true,
        initValue: "+7",
        validateRules: [{"maxLength": 12}, {"minLength": 12}, "phone"]
    },

}

export default personalData;