import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const EditPersonalData = () => {

    const {chatID} = useParams();
    const {pathname} = useLocation();
    const redirectionPath = pathname.replace("/editProfile", "");
    const {categoryList} = localisations.components.form;

    let {users, accountData, admins, employees} = useSelector(state => state.users);
    let userData = users.find(el => el?.chatID === +chatID);
    if (!userData) userData = admins.find(el => el?.chatID === +chatID);
    if (!userData) userData = employees.find(el => el?.chatID === +chatID);

    let inputList = forms.editPersonalData;

    const navigate = useNavigate();
    const {tg} = useTelegram();

    const {tgMainButtonText, confirmMessage, confirmMessageForSuperAdmins} = localisations.pages.editPersonalData;
    const message = accountData.role === "superAdmin" ? confirmMessageForSuperAdmins : confirmMessage;

    const filteringRules = {
        "category": {
            [categoryList[0]]: ["postGraduateEducationYear", "position"],
            [categoryList[1]]: ["studentsEducationYear", "position"],
            [categoryList[2]]: ["studentsEducationYear", "postGraduateEducationYear"]
        },
    }

    const redirect = () => navigate(redirectionPath);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form defaultTextInputs={inputList}
                 defaultValues={userData}
                 tgMainButtonText={tgMainButtonText}
                 chatID={chatID}
                 confirmMessage={message}
                 filteringRules={filteringRules}
    />;
};

export default EditPersonalData;