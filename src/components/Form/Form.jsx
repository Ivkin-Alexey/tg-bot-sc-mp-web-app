import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {TextField} from "@mui/material";

const Form = (props) => {

    const {textInputs, tgMainButtonText} = props;
    const defaultTextInputsValues = textInputs.reduce((acc, cur) => ({ ...acc, [cur.inputAttributes.name]: cur.other.initValue}), {});

    const [data, setData] = useState(defaultTextInputsValues);

    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify(data));
        console.log(data);
    }, [data])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: tgMainButtonText
        })
    }, [])

    useEffect(() => {
        if (Object.values(data).some(el => el === '')) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [data])

    const onChangeData = (e) => {
        setData((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    return (
            textInputs.map((el, i) => {
                return <TextField
                    key={i}
                    onChange={onChangeData}
                    fullWidth
                    error={false}
                    value={data[el.inputAttributes.name]}
                    {...el.inputAttributes}
                />
            })
    );
};

export default Form;