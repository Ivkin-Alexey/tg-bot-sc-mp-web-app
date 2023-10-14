import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {userProfile, userRequirements} from "../../assets/db/userData";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import {Grid, IconButton, ListItem, ListItemIcon} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {useSelector} from "react-redux";
import constants from "../../assets/constants/constants";

export default function Profile() {

    let {userChatID} = useParams();
    const {pathname} = useLocation();
    let path = `/${userChatID}/editProfile`;
    if (pathname.includes("userList")) path = `/userList/${userChatID}/editProfile`
    const navigate = useNavigate();
    const {tg} = useTelegram();
    const redirect = () => navigate('/');
    let userData = useSelector(state => state.users.users.find(el => el.chatID === +userChatID));

    const {
        firstName,
        lastName,
        patronymic,
        phone,
        position,
        study,
        research,
        type,
        otherInfo,
    } = userData;

    const {registrationDate, isUserConfirmed, isUserDataSent} = otherInfo;

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function renderRegistrationStatusInfo() {
        return (
            <>
                {isUserDataSent ?
                    <>
                        <Typography sx={{mb: 1.5}}>
                            {"Дата регистрации: " + registrationDate}
                        </Typography>
                        {isUserConfirmed ?
                            <Typography sx={{mb: 1.5}}>
                                Заявка подтверждена
                            </Typography> :
                            <Typography sx={{mb: 1.5}}>
                                <b>Ожидается подтверждение заявки</b>
                            </Typography>
                        }
                    </>
                    : <b>Заполните и отправьте все данные</b>
                }
            </>
        )
    }

    function renderSuperAdminButtons() {
        return (
            <>
                {!isUserConfirmed && <IconButton aria-label="done" sx={{marginRight: "8px"}}>
                    <DoneOutlineRoundedIcon color="success"/>
                </IconButton>}
                <Button component={Link} to={path} variant="outlined" color="primary" size="small" disableElevation>
                    Редактировать
                </Button>
                <IconButton aria-label="delete" sx={{marginLeft: "8px"}}>
                    <DeleteIcon color="error"/>
                </IconButton>
            </>
        )
    }

    function renderUserButtons() {
        return (
            <Button component={Link} to={path} variant="contained" color="primary" size="small" disableElevation>
                Редактировать
            </Button>
        )
    }

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{fontSize: 14, mb: 1.5}}>
                        {position ? position : <b>Должность не указана</b>}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{mb: 1.5}}>
                        {lastName + ' ' + firstName + ' ' + patronymic}
                    </Typography>
                    <Typography sx={{mb: 1.5}}>
                        Телефон: {phone ? phone : <b>Не указан</b>}
                    </Typography>
                    <Typography sx={{mb: 1.5}}>
                        Научное направление: {research ? "\"" + research + "\"" : <b>Не указано</b>}
                    </Typography>
                    {renderRegistrationStatusInfo()}
                </CardContent>
                <CardActions>
                    {type === constants.userRoles.superAdmin ? renderSuperAdminButtons() : renderUserButtons()}
                </CardActions>
                <Grid item xs={12} md={6}>
                    <List>
                        {userRequirements.map((el, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemIcon>
                                        {el.done ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={el.requirement}/>
                                </ListItem>)
                        })}
                    </List>
                </Grid>
            </Card>
        </Box>
    );
}