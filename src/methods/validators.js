import validateErrorMessages from "../assets/constants/localisations/validateErrors";
import {capitalize} from "./helpers";
const cyrillicWithSpaceRegExp = /[^а-яёА-ЯЁ ]/gi;
const cyrillicRegExp = /[^а-яёА-ЯЁ]/gi;

const phoneRegExp = /\D+/g;
const requiredPhoneCharacter = "+";
const onlySingleWhiteSpacesRegExp = /\s{2,}/g;

const {
    emptyError,
    spaceBetweenWordsOnlyError,
    minLengthError,
} = validateErrorMessages;

export default function validateInputValue(value = "", rules, required) {

    let result = {value, isValid: true, errorText: ""};

    const validateRules = {
        cyrillicTextOnly: () => checkIsCyrillicOnly(),
        spaceBetweenWordsOnly: () => checkIsSpaceBetweenWords(),
        phone: () => checkIsPhone(),
        maxLength: (rule) => checkIsMaxLengthCorrect(rule),
        minLength: (rule) => checkIsMinLengthCorrect(rule),
    }

    executePreCheck();

    rules?.forEach(rule => {
        if (typeof rule === "string") validateRules[rule]();
        else {
            const [[key, value]] = Object.entries(rule)
            validateRules[key](value)
        }
    })

    executeDefaultCheck();

    return result;

    function executePreCheck() {
        value = value?.trimStart();
        if (value === "" && required === true) {
            result.isValid = false;
            result.errorText = emptyError;
        }
    }

    function executeDefaultCheck() {
        if (value === "" && required === true) {
            result.isValid = false;
            result.errorText = emptyError;
        }
        if (!rules?.includes("spaceBetweenWordsOnly")) {
            value = capitalize(value.toLowerCase());
        }
        result.value = value;
    }

    function checkIsCyrillicOnly() {
        if (rules?.includes("spaceBetweenWordsOnly")) value = value?.replace(cyrillicWithSpaceRegExp, "");
        else value = value.replace(cyrillicRegExp, "");
    }

    function checkIsSpaceBetweenWords() {
        value = value.replace(onlySingleWhiteSpacesRegExp, ' ');
        const end = value[value.length - 1];
        if (end === " ") {
            result.isValid = false;
            result.errorText = spaceBetweenWordsOnlyError;
        }
    }

    function checkIsPhone() {
        value = requiredPhoneCharacter + value.replace(phoneRegExp, "");
        if(value === requiredPhoneCharacter) {
            result.isValid = false;
            result.errorText = emptyError;
        }
    }

    function checkIsMaxLengthCorrect(length) {
        if (value.length > length) {
            value = value.substr(0, length);
        }
    }

    function checkIsMinLengthCorrect(length) {
        if (value.length < length) {
            result.isValid = false;
            result.errorText = minLengthError;
        }
    }
}