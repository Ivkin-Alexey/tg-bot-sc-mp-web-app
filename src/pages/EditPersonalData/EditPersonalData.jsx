import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";

const EditPersonalData = () => {

    const {chatID} = useParams();

    let users = useSelector(state => state.users);
    let userData = users.users.find(el => el?.chatID === +chatID);
    if (!userData) userData = users.admins.find(el => el?.chatID === +chatID);

    const navigate = useNavigate();
    const {tg} = useTelegram();
    const textInputs = forms.editPersonalData;
    const {tgMainButtonText, confirmMessage} = localisations.pages.editPersonalData;

    const redirect = () => navigate('/' + chatID);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form textInputs={textInputs}
                 defaultValues={userData}
                 tgMainButtonText={tgMainButtonText}
                 chatID={chatID}
                 confirmMessage={confirmMessage}
    />;
};

export default EditPersonalData;