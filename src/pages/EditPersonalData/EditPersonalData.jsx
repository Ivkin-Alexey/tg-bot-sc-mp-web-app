import React, {useEffect} from 'react';
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";

const EditPersonalData = () => {

    const {chatID} = useParams();
    const {positionList}  = localisations.components.form;

    let users = useSelector(state => state.users);
    let userData = users.users.find(el => el?.chatID === +chatID);
    if (!userData) userData = users.admins.find(el => el?.chatID === +chatID);

    const role = userData.type;
    let textInputs;
    if(role === "user") textInputs = forms.editStudentPersonalData;
    else textInputs = forms.editAdminPersonalData;

    const navigate = useNavigate();
    const {tg} = useTelegram();

    const {tgMainButtonText, confirmMessage} = localisations.pages.editPersonalData;

    const filteringRules = {
        observedInputName: "position",
        rules: [
            {selectedOption: positionList[0].value, hiddenInputName: "postGraduateEducationYear"},
            {selectedOption: positionList[1].value, hiddenInputName: "studentsEducationYear"},
        ]
    }

    const redirect = () => navigate(-1);

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
                 confirmMessage={confirmMessage}
                 filteringRules={filteringRules}
    />;
};

export default EditPersonalData;