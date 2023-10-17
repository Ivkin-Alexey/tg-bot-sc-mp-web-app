import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";

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
    if (pathname.includes("userList")) path = `/userList/${chatID}/editProfile`
    const navigate = useNavigate();
    const {tg} = useTelegram();
    const redirect = () => navigate(redirectionPath);

    const {
        firstName,
        lastName,
        patronymic,
        phone,
        position,
        research,
    } = displayedData;

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{fontSize: 14, mb: 1.5}}>
                        {position ? position : <b>Должность не указана</b>}
                    </Typography>
                    {adminRoleBlock}
                    <Typography variant="h5" component="div" sx={{mb: 1.5}}>
                        {lastName + ' ' + firstName + ' ' + patronymic}
                    </Typography>
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
        </Box>
    );
}