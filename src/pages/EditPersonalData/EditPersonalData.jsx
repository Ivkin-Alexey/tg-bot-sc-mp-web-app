import React, {useCallback, useEffect, useState} from 'react';
import './EditPersonalData.css';
import {useTelegram} from "../../hooks/useTelegram";
import {Box, TextField} from "@mui/material";

const EditPersonalData = () => {


    const [data, setData] = useState({
        fName: '',
        lName: '',
        patronymic: '',
        phone: '+7',
        position: 'Студент'
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
                name="fName"
                value={data.fName}
                onChange={onChangeData}
                fullWidth
                error={false}
            />
            <TextField
                required
                id="outlined-required"
                label="Фамилия"
                name="lName"
                value={data.lName}
                onChange={onChangeData}
                fullWidth
            />
            <TextField
                required
                id="outlined-required"
                label="Отчество"
                name="patronymic"
                value={data.patronymic}
                onChange={onChangeData}
                fullWidth
            />
            <TextField
                required
                id="outlined-search"
                label="Должность"
                name="position"
                type="search"
                value={data.position}
                onChange={onChangeData}
                fullWidth/>
            <TextField
                required
                id="outlined-helperText"
                label="Мобильный"
                name="phone"
                value={data.phone}
                onChange={onChangeData}
                helperText="Номер телефона нужен для экстренной связи"
                fullWidth
            />
        </Box>
    );
};

export default EditPersonalData;