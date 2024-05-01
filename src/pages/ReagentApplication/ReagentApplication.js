import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations/localisations'
import Form from "../../components/Form/Form";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useDispatch, useSelector} from "react-redux";
import {updateReagentApplicationsAction} from "../../store/actions";

const ReagentApplication = () => {

    let {accountData} = useSelector(state => state.users);
    let inputList = forms.reagentApplication;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {tg} = useTelegram();
    const {tgMainButtonText, confirmMessage} = localisations.pages.reagentApplication;

    const redirect = () => navigate(-1);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function sendData(data) {
        dispatch(updateReagentApplicationsAction(accountData, data))
            .then(() => {
                tg.showPopup({message: confirmMessage, buttons: [{type: "ok", text: "Ок"}]}, () => navigate(-1))
            });
    }

    return <Form defaultTextInputs={inputList}
                 tgMainButtonText={tgMainButtonText}
                 sendData={sendData}
    />;
};

export default ReagentApplication;