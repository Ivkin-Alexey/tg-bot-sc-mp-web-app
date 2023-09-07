import React from 'react';
import './Application.css';
import {Box} from "@mui/material";
import localisations from "../../assets/constants/localisations";
import forms from "../../assets/constants/forms";
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";

const Application = () => {

    const {application} = useParams();
    const textInputs = forms[application];
    const {tgMainButtonText} = localisations.pages.application;

    let navigate = useNavigate();
    const redirect = () => navigate('/applications');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form textInputs={textInputs} tgMainButtonText={tgMainButtonText}/>;
};

export default Application;