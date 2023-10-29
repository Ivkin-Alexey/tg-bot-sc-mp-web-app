const cyrillicRegExp = /^[а-яёА-ЯЁ]*$/;
const cyrillicWithSpaceRegExp = /^[а-яёА-ЯЁ]+([\s][а-яёА-ЯЁ]+)*$/;
const phoneRegExp = /^\+?[1-9]\d{10}$/;
const phoneNumberLength = 11;
const maxLength = 100;

const errorTexts = {
    cyrillicError: "Допустима только кириллица",
    emptyError: "Введите значение",
    phoneError: "Допустимы только номера из 11 цифр и символа \"+\" в начале",
    spaceError: "Пробелы недопустимы",
    spaceBetweenWordsError: "Пробелы допустимы только между словами",
    maxLengthError: `Допустимо не более ${maxLength} символов`
}

export default function validateInputValue(value, rule, required) {
    let result = {isValid: true};
    if(value.length > maxLength) {
        result.isValid = false;
        result.errorText = errorTexts.maxLengthError;
        return result;
    }
    if(!rule) return result;
    if(value === "" && required === false) return result;
    if(value === "" && required === true) {
        result.isValid = false;
        result.errorText = errorTexts.emptyError;
        return result;
    }
    const start = value[0];
    const end = value[value.length-1];
        switch (rule) {
            case "cyrillicTextOnly":
               if(cyrillicRegExp.test(value)) result.isValid = true;
               else if(value.indexOf(" ") >= 0) {
                   result.isValid = false;
                   result.errorText = errorTexts.spaceError;
               }
               else {
                   result.isValid = false;
                   result.errorText = errorTexts.cyrillicError;
               }
               break;
            case "cyrillicTextWithSpace":
                if(cyrillicWithSpaceRegExp.test(value)) result.isValid = true;
                else if(start === " " || end === " ") {
                    result.isValid = false;
                    result.errorText = errorTexts.spaceBetweenWordsError;
                }
                else {
                    result.isValid = false;
                    result.errorText = errorTexts.cyrillicError;
                }
                break;
            case "phone":
                if(phoneRegExp.test(value)) result.isValid = true;
                else {
                    result.isValid = false;
                    result.errorText = errorTexts.phoneError;
                }
                break;
            default:
                return result;
        }
        return result;
};