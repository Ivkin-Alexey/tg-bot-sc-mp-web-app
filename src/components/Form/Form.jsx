import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonDataAction} from "../../redux/actions";
import validateInputValue from "../../methods/validators";
import inputs from "../../assets/constants/inputs/inputs";
import {useNavigate} from "react-router-dom";
import localisations from "../../assets/constants/localisations/localisations";

const Form = (props) => {

    const {
        defaultTextInputs,
        tgMainButtonText,
        defaultValues,
        chatID,
        confirmMessage,
        filteringRules,
        sendData = defaultOnSendData
    } = props;

    const dispatch = useDispatch();
    const {accountChatID, accountData} = useSelector(state => state.persons);
    const defaultFormData = defaultTextInputs.reduce((acc, cur) => {

        const inputItem = inputs[cur];

        const {required, initValue, validateRules} = inputItem;
        const value = defaultValues ? defaultValues[cur] : initValue;

        return {
            ...acc,
            [cur]: {
                required,
                validateRules,
                ...validateInputValue(value, validateRules, required),
            }
        }
    }, {});

    const [formData, setFormData] = useState(defaultFormData);
    const [textInputs, setTextInputs] = useState(filterInputs());
    const {tg, queryId} = useTelegram();
    const navigate = useNavigate();

    const onSendData = useCallback(() => {
        const formDataEntries = Object.entries(formData).map(el => [el[0], el[1].value]);
        const data = Object.fromEntries(formDataEntries);
        sendData(data);
    }, [formData]);

    function defaultOnSendData(data) {
        dispatch(updatePersonDataAction(chatID, accountChatID, data, queryId)).then(() => {
            tg.showPopup({message: confirmMessage, buttons: [{type: "ok", text: "Ок"}]}, popupCallback)
        });
    }

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
        setTextInputs(() => filterInputs());
        setFormData(() => formData)
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
                    ...validateInputValue(value, validateRules, required)
                }
            };
        })
    }

    function filterInputs() {
        let hiddenInputs = [];
        for (let rule in filteringRules) {
            const arr = filteringRules[rule];
            const obj = arr.find(el => el.inputValue === formData[rule].value);
            if(obj) hiddenInputs = [...hiddenInputs, ...obj.hiddenFormFields];
            console.log(obj);  
        }
        return defaultTextInputs.filter(el => !hiddenInputs.includes(el));
    }

    function validateFormData() {
        return Object.values(formData).find(el => el.isValid === false);
    }

    function renderSelectOptions(options) {
        return options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem> 
        ))
    }

    function renderTextFields() {
        return textInputs.map((el, i) => {
            const {value, isValid, errorText} = formData[el];
            const {selectOptions, id, label, select, required} = inputs[el];
            if (selectOptions) console.log(selectOptions)
            return <TextField
                error={!isValid}
                required={required}
                name={el}
                helperText={errorText}
                key={i}
                onChange={onChangeData}
                fullWidth
                value={value}
                id={id}
                label={label}
                select={select}
            >{selectOptions && renderSelectOptions(selectOptions)}
            </TextField>
        })
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
                {localisations.components.form.header}
            </ListSubheader>
            {renderTextFields()}
            <Button onClick={() => {
                if(!validateFormData()) onSendData()
            }}>Отправить</Button>
        </Stack>
    );
};

export default Form;