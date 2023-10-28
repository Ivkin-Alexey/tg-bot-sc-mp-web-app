import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonDataAction} from "../../redux/actions";
import validateInputValue from "../../methods/validators";

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
    const {accountChatID} = useSelector(state => state.users);
    const [textInputs, setTextInputs] = useState(defaultTextInputs);

    const defaultFormData = textInputs.reduce((acc, cur) => {
        const {name, required} = cur.inputAttributes;
        const {initValue, validateRule = null} = cur.other;
        return {
            ...acc,
            [name]: {
                value: defaultValues[name] || initValue,
                required,
                valid: {isValid: true},
                validateRule
            }
        }
    }, {});

    const [formData, setFormData] = useState(defaultFormData);
    const observedValue = formData[filteringRules?.observedInputName];
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const formDataEntries = Object.entries(formData).map(el => [el[0], el[1].value]);
        const data = Object.fromEntries(formDataEntries);
        dispatch(updatePersonDataAction(chatID, accountChatID, data, queryId))
            .then(() => {
                tg.showPopup({message: confirmMessage, buttons: [{type: "ok", text: "Ок"}]}, () => tg.close())
            });
    }, [formData]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: tgMainButtonText
        })
    }, []);

    useEffect(() => {
        if (Object.values(formData).find(el => el.valid.isValid === false)) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [formData]);

    const onChangeData = (e) => {
        let {name, value} = e.target;
        value = value ? value[0].toUpperCase() + value.slice(1) : "";
        setFormData(state => {
            const {validateRule, required} = state[name];
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    valid: validateInputValue(value, validateRule, required)
                }
            };
        })
        console.log(formData);
    }

    function filterInputs(input) {
        const rule = filteringRules?.rules?.find(el => el.selectedOption === observedValue);
        return input.inputAttributes.name !== rule?.hiddenInputName;
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
        >
            <ListSubheader component="div">
                Заполните поля:
            </ListSubheader>
            {textInputs.map((el, i) => {
                const {name, helperText = null} = el.inputAttributes;
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