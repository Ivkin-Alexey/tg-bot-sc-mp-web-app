import React, {useEffect} from 'react';
// import './EditPersonalData.css';
import {Box} from "@mui/material";
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";

const EditPersonalData = () => {

    const navigate = useNavigate();
    const {tg} = useTelegram();
    const textInputs = forms.editPersonalData;
    const {tgMainButtonText} = localisations.pages.editPersonalData;

    const redirect = () => navigate('/profile');

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form textInputs={textInputs} tgMainButtonText={tgMainButtonText}/>;
};

export default EditPersonalData;