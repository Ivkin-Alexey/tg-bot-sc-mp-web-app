import React from 'react';
import './Reagents.css';
import AddIcon from '@mui/icons-material/Add';
import {Button, Stack} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {constants} from '../../assets/constants';
import ReagentsFormItem from "../../components/ReagentsFormItem/ReagentsFormItem";

const Reagents = () => {

    const {reagents} = constants.pages;
    const defaultReagent = {name: '', amount: ''};
    const [reagentList, setReagentList] = useState([defaultReagent]);

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify(reagentList));
    }, [reagentList])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: reagents.tgMainButtonText
        })
    }, [])

    useEffect(() => {
        reagentList.forEach(reagent => {
            if (Object.values(reagent).some(el => el === '')) {
                tg.MainButton.hide();
                return
            }
            tg.MainButton.show();
        })
    }, [reagentList])

    const onChangeReagent = (e, i) => {
        setReagentList(prevState => {
            return prevState.map((el, index) => {
                if (index === i) {
                    return {...el, [e.target.name]: e.target.value}
                }
                return el
            })
        });
    };

    const addReagent = () => {
        setReagentList(list => [...list, defaultReagent])
    };

    const deleteReagent = (index) => {
        setReagentList(prevState => prevState.filter((_, i) => i !== index))
    }

    return (
        <Stack
            direction="column"
            spacing={2}
        >
            {reagentList && reagentList.map((el, i) => {
                return <ReagentsFormItem
                    deleteReagent={deleteReagent}
                    onChangeReagent={onChangeReagent}
                    reagent={el}
                    key={i}
                    index={i}
                />
            })}
            <Button
                variant="contained"
                endIcon={<AddIcon/>}
                onClick={addReagent}
                disabled={reagentList.length >= reagents.maxNumberOfReagents}
                disableElevation
            />
        </Stack>
    );
};

export default Reagents;