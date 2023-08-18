import React from 'react';
import './EditPersonalData.css';
import {Box} from "@mui/material";
import forms from '../../assets/constants/forms';
import localisations from '../../assets/constants/localisations'
import Form from "../../components/Form/Form";

const EditPersonalData = () => {

    const textInputs = forms.editPersonalData;
    const {tgMainButtonText} = localisations.pages.editPersonalData;

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '90%'},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}
            noValidate
            autoComplete="off"
        >
            <Form textInputs={textInputs} tgMainButtonText={tgMainButtonText}/>
        </Box>
    );
};

export default EditPersonalData;