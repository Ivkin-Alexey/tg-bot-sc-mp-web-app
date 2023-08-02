import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import {Box, TextField} from "@mui/material";

const Form = () => {


    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        position: ''
    });

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
            text: 'Отправить данные'
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
            <TextField
                required
                id="outlined-required"
                label="Имя"
                defaultValue=""
                fullWidth
                error={false}
            />
            <TextField
                required
                id="outlined-required"
                label="Фамилия"
                defaultValue=""
                fullWidth
            />
            <TextField
                required
                id="outlined-required"
                label="Отчество"
                defaultValue=""
                fullWidth
            />
            <TextField required id="outlined-search" label="Должность" type="search" defaultValue="Студент" fullWidth/>
            <TextField
                required
                id="outlined-helperText"
                label="Мобильный"
                defaultValue="+7"
                helperText="Номер телефона нужен для экстренной связи"
                fullWidth
            />
        </Box>
    );
};

export default Form;