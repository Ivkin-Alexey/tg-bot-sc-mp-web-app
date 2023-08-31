import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {TextField} from "@mui/material";
import constants from "../../assets/constants/constants";

const Form = (props) => {

    const {textInputs, tgMainButtonText} = props;
    const {port, staticServerIP} = constants;
    const defaultTextInputsValues = textInputs.reduce((acc, cur) => ({ ...acc, [cur.inputAttributes.name]: cur.other.initValue}), {});

    const [formData, setFormData] = useState(defaultTextInputsValues);
    const {tg, queryId} = useTelegram();

    console.log(tg, queryId);

    const onSendData = useCallback(() => {
            const data = {
                formData,
                queryId,
            }
            try {
                fetch(`http://${staticServerIP}:${port}/web-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
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
        <>
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
        </>

    );
};

export default Form;