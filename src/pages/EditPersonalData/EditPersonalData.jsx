import React, {useCallback, useEffect, useState} from 'react';
import './EditPersonalData.css';
import {useTelegram} from "../../hooks/useTelegram";
import {Box, TextField} from "@mui/material";
import {forms} from '../../assets/constants';
import {constants} from '../../assets/constants'

const EditPersonalData = () => {

    const textInputs = forms.editPersonalData;
    const initialTextInputsValues = textInputs.reduce((acc, cur) => ({ ...acc, [cur.inputAttributes.name]: cur.other.initValue}), {})
    console.log(initialTextInputsValues);
    const [data, setData] = useState(initialTextInputsValues);

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify(data));
    }, [data])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: constants.pages.editPersonalData.tgMainButtonText
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
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '90%'},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}
            noValidate
            autoComplete="off"
        >
            {textInputs.map((el, i) => {
                return <TextField
                    key={i}
                    onChange={onChangeData}
                    fullWidth
                    error={false}
                    value={data[el.inputAttributes.name]}
                    {...el.inputAttributes}
                />
            })}
        </Box>
    );
};

export default EditPersonalData;