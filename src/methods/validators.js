const cyrillicRegExp = /[а-яА-ЯЁё]/;
const phoneRegExp = /^\+?[1-9][0-9]{10}$/;

const errorTexts = {
    cyrillicError: "Допустима только кириллица",
    emptyError: "Введите значение",
    phoneError: "Допустимы только цифры и символ \"+\"",
}

export default function validateInputValue(value, rule, required) {
    let result = {isValid: true};
    if(value === "" && required === false) return result;
    if(value === "" && required === true) {
        result.isValid = false;
        result.errorText = errorTexts.emptyError;
        return result;
    }
    if(!rule) return result;
        switch (rule) {
            case "cyrillicTextOnly":
               if(cyrillicRegExp.test(value)) result.isValid = true;
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