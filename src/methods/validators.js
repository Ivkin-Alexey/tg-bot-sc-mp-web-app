import {validateRules, errorMessages} from "../assets/constants/validateRules";

const cyrillicRegExp = /^[а-яёА-ЯЁ]*$/;
const phoneRegExp = /^\+?[1-9]\d{10}$/;

const {
    cyrillicTextOnly,
    maxLength30,
    maxLength100,
    minLength2,
    phone,
    spaceBetweenWordsOnly
} = validateRules;

const {
    emptyError,
    cyrillicError,
    spaceBetweenWordsOnlyError,
    maxLengthError,
    minLengthError,
    phoneError,
    spaceError
} = errorMessages;

export default function validateInputValue(value, rules, required) {

    let result = {isValid: true, errorText: ""};

    rules?.forEach(rule => {
        if(!result.isValid) return result;
        switch (rule) {
            case cyrillicTextOnly:
                checkIsCyrillicOnly();
                break;
            case spaceBetweenWordsOnly:
                checkIsSpaceBetweenWords();
                break;
            case phone:
                checkIsPhone();
                break;
            case maxLength30:
            case maxLength100:
                checkIsMaxLengthCorrect(rule);
                break;
            case minLength2:
                checkIsMinLengthCorrect(rule);
                break;
        }
    })

    executeDefaultCheck();
    console.log(result);
    return result;

    function checkIsCyrillicOnly() {
        const valueWithoutSpaces = value.replaceAll(" ", "");
        if (!cyrillicRegExp.test(valueWithoutSpaces)){
            result.isValid = false;
            result.errorText = cyrillicError;
        }
    }

    function checkIsSpaceBetweenWords() {
        const start = value[0];
        const end = value[value.length - 1];
        if (start === " " || end === " ") {
            result.isValid = false;
            result.errorText = spaceBetweenWordsOnlyError;
        }
    }

    function checkIsPhone() {
        if (phoneRegExp.test(value)) result.isValid = true;
        else {
            result.isValid = false;
            result.errorText = phoneError;
        }
    }

    function checkIsMaxLengthCorrect(rule) {
        let length;
        if(rule === "maxLength100") length = 100;
        if(rule === "maxLength30") length = 30;
        if (value.length > length) {
            result.isValid = false;
            result.errorText = maxLengthError;
        }
    }

    function checkIsMinLengthCorrect(rule) {
        let length;
        if(rule === "minLength2") length = 2;
        if (value.length < length) {
            if(value === "" && !required) return
            result.isValid = false;
            result.errorText = minLengthError;
        }
    }

    function executeDefaultCheck() {
        if (value === "" && required === true) {
            result.isValid = false;
            result.errorText = emptyError;
        }
        if (!rules?.includes(spaceBetweenWordsOnly) && value.indexOf(" ") >= 0) {
            result.isValid = false;
            result.errorText = spaceError;
        }
    }
}