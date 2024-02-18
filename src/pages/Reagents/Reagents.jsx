import React from 'react';
import './Reagents.css';
import AddIcon from '@mui/icons-material/Add';
import {Button, Divider, Stack,} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import localisations from '../../assets/constants/localisations/localisations';
import forms from "../../assets/constants/forms";
import ReagentsFormItem from "../../components/ReagentsFormItem/ReagentsFormItem";
import {useNavigate} from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";

const Reagents = () => {

    const navigate = useNavigate();

    const defaultInputsList = forms.reagentApplication;
    const {reagents} = localisations.pages;

    const defaultTextInputsValues = defaultInputsList.reduce((acc, cur) => ({
        ...acc,
        [cur.inputAttributes.name]: cur.other.initValue
    }), {});

    const [reagentsData, setReagentsData] = useState([defaultTextInputsValues]);
    const [inputsList, setInputsList] = useState([defaultInputsList]);

    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            reagentsData,
            queryId,
        }
        fetch('http://92.53.101.85:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [reagentsData])

    const onChangeData = (e, index) => {
        setReagentsData(data => data.map((el, i) => {
            if (i === index) {
                return {...el, [e.target.name]: e.target.value}
            } else {
                return el
            }
        }))
    };

    const redirect = () => navigate('/');

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: reagents.tgMainButtonText
        })
    }, []);

    useEffect(() => {
        let isDataFilled = true;
        for (let i = 0; i < reagentsData.length; i++) {
            if (Object.values(reagentsData[i]).some(el => el === '')) {
                isDataFilled = false;
                tg.MainButton.hide();
                return;
            }
        }
        if (isDataFilled) {
            tg.MainButton.show();
            console.log('show')
        }

    }, [reagentsData])

    const addReagent = () => {
        setReagentsData(data => [...data, defaultTextInputsValues]);
        setInputsList((list) => [...list, defaultInputsList]);
    };

    const deleteReagent = (index) => {
        setInputsList(list => list.filter((_, i) => i !== index));
        setReagentsData(data => data.filter((_, i) => i !== index));
    }

    return (
        <>
            <Stack
                direction="column"
                spacing={2}
            >
                <ListSubheader component="div">
                    Заполните поля:
                </ListSubheader>
                {inputsList.map((el, i) => {
                    return (
                        <>
                            <ReagentsFormItem
                                inputs={inputsList[i]}
                                data={reagentsData}
                                index={i}
                                reagentsNumber={inputsList.length}
                                key={i}
                                deleteReagent={deleteReagent}
                                onChangeData={onChangeData}
                            />
                            {inputsList.length > 1 && <Divider>{'Реактив ' + (i + 1)}</Divider>}
                        </>)
                })}
                <Button
                    variant="contained"
                    endIcon={<AddIcon/>}
                    onClick={addReagent}
                    disabled={reagentsData.length >= reagents.maxNumberOfReagents}
                    disableElevation
                />
            </Stack>
        </>
    );
};

export default Reagents;