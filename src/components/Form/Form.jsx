import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

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
        if(Object.values(data).some(el=>el==='')) {
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
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                name="firstName"
                value={data.firstName}
                onChange={onChangeData}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Фамилия'}
                name="lastName"
                value={data.lastName}
                onChange={onChangeData}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Отчество'}
                name="patronymic"
                value={data.patronymic}
                onChange={onChangeData}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Мобильный телефон'}
                name="phone"
                value={data.phone}
                onChange={onChangeData}
            />
            <select name="position" value={data.position} onChange={onChangeData} className={'select'}>
                <option value={'physical'}>Студент</option>
                <option value={'physical'}>Аспирант</option>
                <option value={'legal'}>Преподаватель</option>
                <option value={'legal'}>Другое</option>
            </select>
        </div>
    );
};

export default Form;