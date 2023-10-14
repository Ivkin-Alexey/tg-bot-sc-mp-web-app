import React, {useEffect} from 'react';
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
    const {tgMainButtonText, confirmMessage} = localisations.pages.editPersonalData;

    const redirect = () => navigate('/' + userChatID);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form textInputs
                 defaultValues={userData}
                 tgMainButtonText
                 userChatID
                 confirmMessage
    />;
};

export default EditPersonalData;