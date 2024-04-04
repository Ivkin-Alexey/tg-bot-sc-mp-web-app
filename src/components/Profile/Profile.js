import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {Chip, Container} from "@mui/material";
import {researchesSelectOptions} from "../../assets/db/db"
import { createFullPersonName } from '../../methods/helpers';
import localisations from '../../assets/constants/localisations/localisations';

export default function Profile(props) {

    const {
        displayedData,
        adminRoleBlock = null,
        requirementsBlock = null,
        registrationBlock = null,
        buttonsBlock = null,
        redirectionPath
    } = props;

    let {chatID} = useParams();
    const {pathname} = useLocation();
    let path = `/${chatID}/editProfile`;
    if (pathname.includes("personList")) path = `/personList/${chatID}/editProfile`
    const navigate = useNavigate();
    const {tg} = useTelegram();
    const redirect = () => navigate(-1);
    const fullName = createFullPersonName(displayedData);

    const {
        firstName,
        lastName,
        patronymic,
        phone,
        position,
        research,
        isPersonConfirmed,
    } = displayedData || {};

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function renderPersonNameFragment() {
        return(fullName ? 
            <Typography variant="h5" sx={{mb: 1.5}}>
                {fullName}
            </Typography> 
            : <Typography variant="h5" sx={{mb: 1.5, color: "red"}}>
                {localisations.components.profile.emptyFullName}
            </Typography>
            )
    }


    return (
        <Container sx={{minWidth: 275, width: "auto"}}>
            <Card variant="outlined" sx={{margin: 0, border: "none"}}>
                <CardContent sx={{paddingLeft: 3, paddingRight: 3}}>
                    <Box sx={{display: "flex", justifyContent: "flex-end", marginBottom: "15px"}}>
                        {isPersonConfirmed ?
                            <Chip label="Подтверждён" size="small" color="success" variant="outlined"/> :
                            <Chip label="Не подтверждён" size="small" color="error" variant="outlined"/>
                        }
                    </Box>
                    <Typography sx={{fontSize: 14, mb: 1.5}}>
                        {position ? position : <b>Должность не указана</b>}
                    </Typography>
                    {adminRoleBlock}
                    {renderPersonNameFragment()}
                    <Typography sx={{mb: 1.5}}>
                        Телефон: {phone ? phone : <b>Не указан</b>}
                    </Typography>
                    <Typography sx={{mb: 1.5}}>
                        Научное направление: {research ? "\"" + research + "\"" : <b>Не указано</b>}
                    </Typography>
                    {registrationBlock}
                </CardContent>
                <CardActions>{buttonsBlock}</CardActions>
                {requirementsBlock}
            </Card>
        </Container>
    );
}