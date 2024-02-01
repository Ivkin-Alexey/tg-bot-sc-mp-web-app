import validateErrorMessages from "../assets/constants/localisations/validateErrors";
const cyrillicRegExp = /^[а-яёА-ЯЁ]*$/;
// const phoneRegExp = /^\+?[1-9]\d{10}$/;
const phoneRegExp = /\D+/g;
const maxPhoneLength = 12;
const minPhoneLength = 11;

const {
    emptyError,
    cyrillicError,
    spaceBetweenWordsOnlyError,
    maxLengthError,
    minLengthError,
    phoneError,
    spaceError
} = validateErrorMessages;

export default function validateInputValue(value, rules, required) {

    let result = {value: value, isValid: true, errorText: ""};

    const validateRules = {
        cyrillicTextOnly: () => checkIsCyrillicOnly(),
        spaceBetweenWordsOnly: () => checkIsSpaceBetweenWords(),
        phone: () => checkIsPhone(),
        maxLength30: (rule) => checkIsMaxLengthCorrect(rule),
        maxLength100: (rule) => checkIsMaxLengthCorrect(rule),
        minLength2: (rule) => checkIsMinLengthCorrect(rule),
    }

    rules?.forEach(rule => {
        if(!result.isValid) return result;
        validateRules[rule](rule);
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
        result.value = value.replace(/\s{2,}/g, ' ');
    }

    function checkIsPhone() {
        result.value = value.replace(/\D+/g, "");
        if (phoneRegExp.test(value)) result.isValid = true;
        if (value.length > maxPhoneLength) {
            result.isValid = false;
            result.errorText = maxLengthError;
        }
        if (value.length < minPhoneLength) {
            result.isValid = false;
            result.errorText = minLengthError;
        }
    }

    function checkIsMaxLengthCorrect(rule) {
        let length = rule.replace(/\D+/g, "");
        if (value.length > length) {
            result.isValid = false;
            result.errorText = maxLengthError;
        }
    }

    function checkIsMinLengthCorrect(rule) {
        let length = rule.replace(/\D+/g, "");
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
        if (!rules?.includes("spaceBetweenWordsOnly") && value.indexOf(" ") >= 0) {
            result.value = value.replace(" ", "");
        }
    }
}