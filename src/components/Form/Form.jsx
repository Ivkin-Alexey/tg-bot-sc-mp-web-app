import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonDataAction} from "../../redux/actions";

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
    let defaultRequiredFormData = {};

    const defaultFormData = textInputs.reduce((acc, cur) => {
        const {name, required} = cur.inputAttributes;
        if (required) defaultRequiredFormData[name] = defaultValues[name] || cur.other.initValue;
        return {
            ...acc,
            [name]: defaultValues[name] || cur.other.initValue
        }
    }, {});

    const [formData, setFormData] = useState(defaultFormData);
    const [requiredFormData, setRequiredFormData] = useState(defaultRequiredFormData);

    const observedValue = formData[filteringRules?.observedInputName];
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        dispatch(updatePersonDataAction(chatID, accountChatID, formData, queryId))
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
        if (Object.values(requiredFormData).some(el => el === '')) {
            tg.MainButton.hide();
            console.log("hide");
        } else {
            tg.MainButton.show();
            console.log("show");
        }
    }, [requiredFormData])

    const onChangeData = (e) => {
        const {name, value} = e.target;
        setFormData((state) => ({
            ...state,
            [name]: value
        }));
        if (requiredFormData[name] !== undefined) {
            setRequiredFormData((state) => ({
                ...state,
                [name]: value
            }));
        }
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
            <Button onClick={onSendData}>Отправить</Button>
        </Stack>
    );
};

export default Form;