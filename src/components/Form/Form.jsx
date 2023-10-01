import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {Stack, TextField} from "@mui/material";
import constants from "../../assets/constants/constants";
import ListSubheader from "@mui/material/ListSubheader";

const Form = (props) => {

    const {textInputs, tgMainButtonText} = props;
    const {staticServerIP, port} = constants;
    const defaultTextInputsValues = textInputs.reduce((acc, cur) => ({
        ...acc,
        [cur.inputAttributes.name]: cur.other.initValue
    }), {});

    const [formData, setFormData] = useState(defaultTextInputsValues);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            formData,
            queryId,
        }
        try {
            fetch(`https://${staticServerIP}:${port}/web-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: 123})
            }).then(res => console.log(res))
            console.log(data);
        } catch (e) {
            console.log(e);
        }

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

    return (
        <Stack
            direction="column"
            spacing={2}
            width={"350px"}
        >
            <ListSubheader component="div">
                Заполните поля:
            </ListSubheader>
            {textInputs.map((el, i) => {
                return <TextField
                    key={i}
                    onChange={onChangeData}
                    fullWidth
                    error={false}
                    value={formData[el.inputAttributes.name]}
                    {...el.inputAttributes}
                />
            })}
        </Stack>

    );
};

export default Form;