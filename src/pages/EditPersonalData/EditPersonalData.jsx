import React, {useEffect} from 'react';
// import './EditPersonalData.css';
import {Box} from "@mui/material";
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";

const EditPersonalData = () => {

    const {userChatID}= useParams();
    let userData = useSelector(state => state.users.users.find(el => el.chatID === +userChatID));

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

    return <Form textInputs={textInputs} defaultValues={userData} tgMainButtonText={tgMainButtonText} userChatID={userChatID}/>;
};

export default EditPersonalData;