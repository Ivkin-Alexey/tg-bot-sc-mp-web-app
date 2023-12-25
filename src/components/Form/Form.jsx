import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonDataAction} from "../../redux/actions";
import validateInputValue from "../../methods/validators";
import {useNavigate} from "react-router-dom";

const Form = (props) => {

    const {
        defaultTextInputs,
        tgMainButtonText,
        defaultValues,
        chatID,
        confirmMessage,
        filteringRules = null
    } = props;

    const dispatch = useDispatch();
    const {accountChatID, accountData} = useSelector(state => state.users);
    const [textInputs, setTextInputs] = useState(defaultTextInputs);

    const defaultFormData = textInputs.reduce((acc, cur) => {
        const {name, required} = cur.inputAttributes;
        const {initValue, validateRules = null} = cur.other;
        const value = defaultValues[name] || initValue;
        return {
            ...acc,
            [name]: {
                value,
                required,
                valid: validateInputValue(value, validateRules, required),
                validateRules
            }
        }
    }, {});

    const [formData, setFormData] = useState(defaultFormData);
    const observedValue = formData[filteringRules?.observedInputName];
    const {tg, queryId} = useTelegram();
    const navigate = useNavigate();

    const onSendData = useCallback(() => {
        const formDataEntries = Object.entries(formData).map(el => [el[0], el[1].value]);
        const data = Object.fromEntries(formDataEntries);
        dispatch(updatePersonDataAction(chatID, accountChatID, data, queryId))
            .then(() => {
                tg.showPopup({message: confirmMessage, buttons: [{type: "ok", text: "Ок"}]}, popupCallback)
            });
    }, [formData]);

    function popupCallback() {
        if(accountData.role === "superAdmin") navigate(-1);
        else tg.close()
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.expand();
        tg.MainButton.setParams({
            text: tgMainButtonText
        })
    }, []);

    useEffect(() => {
        if (validateFormData()) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [formData]);


    const onChangeData = (e) => {
        let {name, value} = e.target;
        value = value ? value[0].toUpperCase() + value.slice(1) : "";
        setFormData(state => {
            const {validateRules, required} = state[name];
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    valid: validateInputValue(value, validateRules, required)
                }
            };
        })
    }

    function filterInputs(input) {
        const rule = filteringRules?.rules?.find(el => el.selectedOption === observedValue.value);
        return input.inputAttributes.name !== rule?.hiddenInputName;
    }

    function validateFormData() {
        return Object.values(formData).find(el => el.valid.isValid === false);
    }

    useEffect(() => {
        if (filteringRules) setTextInputs(defaultTextInputs.filter(filterInputs));
    }, [observedValue])

    function renderSelectOptions(options) {
        return options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))
    }

    return (
        <Stack
            direction="column"
            spacing={2}
            width={"350px"}
            marginBottom={"50px"}
            component="form"
            noValidate
            autoComplete="off"
        >
            <ListSubheader component="div">
                Заполните поля:
            </ListSubheader>
            {textInputs.map((el, i) => {
                const {name} = el.inputAttributes;
                const {value, valid} = formData[name];
                const options = el.other?.selectOptions;
                return <TextField
                    error={!valid.isValid}
                    helperText={valid.errorText}
                    key={i}
                    onChange={onChangeData}
                    fullWidth
                    value={value}
                    {...el.inputAttributes}
                >{options && renderSelectOptions(options)}
                </TextField>
            })}
            {/*<Button onClick={onSendData}>Отправить</Button>*/}
        </Stack>
    );
};

export default Form;