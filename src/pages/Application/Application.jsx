import React from 'react';
import {Box} from "@mui/material";
import localisations from "../../assets/constants/localisations";
import forms from "../../assets/constants/forms";
import Form from "../../components/Form/Form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "@types/react";

const Application = () => {

    const {application} = useParams();
    const textInputs = forms[application];
    const {tgMainButtonText} = localisations.pages.application;

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

export default Application;