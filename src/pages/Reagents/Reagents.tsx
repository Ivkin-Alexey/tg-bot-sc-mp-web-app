import React from 'react';
import './Reagents.css';
import AddIcon from '@mui/icons-material/Add';
import {Button, IconButton, Stack, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import localisations from '../../assets/constants/localisations';
import forms from "../../assets/constants/forms";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {ITextInputAttributes, IReagentsListItem} from "../../types/interfaces";
import ReagentsFormItem from "../../components/ReagentsFormItem/ReagentsFormItem";

const Reagents = () => {

    const defaultInputsList: ITextInputAttributes[] = forms.reagentsFormItem;
    const {reagents} = localisations.pages;

    const defaultTextInputsValues: IReagentsListItem = defaultInputsList.reduce((acc, cur) => ({
        ...acc,
        [cur.inputAttributes.name]: cur.other.initValue
    }), {});

    const [data, setData] = useState<IReagentsListItem[]>([defaultTextInputsValues]);
    const [inputsList, setInputsList] = useState<[ITextInputAttributes[]]>([defaultInputsList]);

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify(data));
    }, [data])

    const onChangeData = (e, index) => {
        setData(data => data.map((el, i) => {
            if (i === index) {
                return {...el, [e.target.name]: e.target.value}
            } else {
                return el
            }
        }))
    };

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
        for (let i = 0; i < data.length; i++) {
            if (Object.values(data[i]).some(el => el === '')) {
                isDataFilled = false;
                tg.MainButton.hide();
                console.log('hide')
                return;
            }
        }
        if(isDataFilled) {
            tg.MainButton.show();
            console.log('show')
        }

    }, [data])

    const addReagent = () => {
        setData(data => [...data, defaultTextInputsValues]);
        setInputsList((list: [ITextInputAttributes[]]) => [...list, defaultInputsList])
    };

    const deleteReagent = (index) => {
        setInputsList(list => list.filter((_, i) => i !== index));
        setData(data => data.filter((_, i) => i !== index));
    }

    return (
        <>
            <Stack
                direction="column"
                spacing={2}
            >
                {inputsList.map((el, i) => {
                    return <ReagentsFormItem
                        inputs={inputsList[i]}
                        data={data}
                        index={i}
                        key={i}
                        deleteReagent={deleteReagent}
                        onChangeData={onChangeData}
                    />
                })}
                <Button
                    variant="contained"
                    endIcon={<AddIcon/>}
                    onClick={addReagent}
                    disabled={data.length >= reagents.maxNumberOfReagents}
                    disableElevation
                />
            </Stack>
        </>
    );
};

export default Reagents;