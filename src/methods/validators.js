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

    let result = {isValid: true, errorTexts: ""};

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
                checkIsPhone();
                break;
        }
    })

    executeDefaultCheck();

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
        let maxLength;
        if(rule === "maxLength100") maxLength = 100;
        if(rule === "maxLength30") maxLength = 30;
        if (value.length > maxLength) {
            result.isValid = false;
            result.errorText = maxLengthError;
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