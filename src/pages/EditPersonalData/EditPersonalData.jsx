import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import { categoryFilteringRules } from '../../assets/constants/inputs/filteringRules';

const EditPersonalData = () => {

    const {chatID} = useParams();
    const {pathname} = useLocation();
    const redirectionPath = pathname.replace("/editProfile", "");
    const {categoryList} = localisations.components.form;

    let {persons, accountData, admins, employees} = useSelector(state => state.persons);
    let personData = persons.find(el => el?.chatID === +chatID);
    if (!personData) personData = admins.find(el => el?.chatID === +chatID);
    if (!personData) personData = employees.find(el => el?.chatID === +chatID);

    let inputList = forms.editPersonalData;

    const navigate = useNavigate();
    const {tg} = useTelegram();

    const {tgMainButtonText, confirmMessage, confirmMessageForSuperAdmins} = localisations.pages.editPersonalData;
    const message = accountData.role === "superAdmin" ? confirmMessageForSuperAdmins : confirmMessage;

    const redirect = () => navigate(redirectionPath);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form defaultTextInputs={inputList}
                 defaultValues={personData}
                 tgMainButtonText={tgMainButtonText}
                 chatID={chatID}
                 confirmMessage={message}
                 filteringRules={categoryFilteringRules}
    />;
};

export default EditPersonalData;