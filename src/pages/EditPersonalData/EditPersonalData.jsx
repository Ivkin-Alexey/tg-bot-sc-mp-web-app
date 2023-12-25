import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const EditPersonalData = () => {

    const {chatID} = useParams();
    const {pathname} = useLocation();
    const redirectionPath = pathname.replace("/editProfile", "");
    const {positionList}  = localisations.components.form;

    let {users, accountData, admins} = useSelector(state => state.users);
    let userData = users.find(el => el?.chatID === +chatID);
    if (!userData) userData = admins.find(el => el?.chatID === +chatID);

    const role = userData.role;
    let textInputs;
    if(role === "user") textInputs = forms.editStudentPersonalData;
    else textInputs = forms.editAdminPersonalData;

    const navigate = useNavigate();
    const {tg} = useTelegram();

    const {tgMainButtonText, confirmMessage, confirmMessageForSuperAdmins} = localisations.pages.editPersonalData;
    const message = accountData.role === "superAdmin" ? confirmMessageForSuperAdmins : confirmMessage;

    const filteringRules = {
        observedInputName: "position",
        rules: [
            {selectedOption: positionList[0].value, hiddenInputName: "postGraduateEducationYear"},
            {selectedOption: positionList[1].value, hiddenInputName: "studentsEducationYear"},
        ]
    }

    const redirect = () => navigate(redirectionPath);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return <Form defaultTextInputs={textInputs}
                 defaultValues={userData}
                 tgMainButtonText={tgMainButtonText}
                 chatID={chatID}
                 confirmMessage={message}
                 filteringRules={filteringRules}
    />;
};

export default EditPersonalData;