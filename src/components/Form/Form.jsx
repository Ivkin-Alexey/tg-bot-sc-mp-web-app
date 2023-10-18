import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import {updatePersonData} from "../../methods/postDataToServer";
import Button from "@mui/material/Button";

const Form = (props) => {

    const {
        defaultTextInputs,
        tgMainButtonText,
        defaultValues,
        chatID,
        confirmMessage,
        filteringRules
    } = props;

    const [textInputs, setTextInputs] = useState(defaultTextInputs);

    const defaultTextInputsValues = textInputs.reduce((acc, cur) => ({
        ...acc,
        [cur.inputAttributes.name]: defaultValues[cur.inputAttributes.name] || cur.other.initValue
    }), {});

    const [formData, setFormData] = useState(defaultTextInputsValues);
    const observedValue = formData[filteringRules.observedInputName];

    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        updatePersonData(formData, queryId, chatID)
            .then(() => {
                tg.showPopup({message: confirmMessage, buttons: [{type: "ok", text: "Ок"}]}, () => tg.close())
            });
    }, [formData])

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
    }, [])

    useEffect(() => {
        if (Object.values(formData).some(el => el === '')) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [formData])

    const onChangeData = (e) => {
        setFormData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    function filterInputs(input) {
        const rule = filteringRules.rules?.find(el=>el.selectedOption === observedValue);
        return input.inputAttributes.name !== rule.hiddenInputName;
    }

    useEffect(() => {
        setTextInputs(defaultTextInputs.filter(filterInputs));
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
                const options = el.other?.selectOptions;
                return <TextField
                    key={i}
                    onChange={onChangeData}
                    fullWidth
                    error={false}
                    value={formData[el.inputAttributes.name]}
                    {...el.inputAttributes}
                >{options && renderSelectOptions(options)}
                </TextField>
            })}
            {/*<Button onClick={onSendData}>Отправить</Button>*/}
        </Stack>
    );
};

export default Form;