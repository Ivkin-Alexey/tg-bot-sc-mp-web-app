import * as React from 'react';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Profile from "../../components/Profile/Profile";
import {Chip, Grid, IconButton, ListItem, ListItemIcon} from "@mui/material";
import List from "@mui/material/List";
import {userRequirements} from "../../assets/db/userData";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import constants from "../../assets/constants/constants";
import localisations from "../../assets/constants/localisations";
import {useTelegram} from "../../hooks/useTelegram";
import {confirmPersonAction, deletePersonAction} from "../../redux/actions";
import {useEffect} from "@types/react";

export default function UserProfile() {
    const {chatID} = useParams();
    const {tg} = useTelegram();
    const navigate = useNavigate();
    const displayedData = useSelector(state => state.users.users.find(el => el.chatID === +chatID));
    const {accountData, accountChatID} = useSelector(state => state.users);
    const role = accountData.type;
    const isAdmin = role === constants.userRoles.admin;
    const isSuperAdmin = role === constants.userRoles.superAdmin;
    const {otherInfo, isUserConfirmed} = displayedData;
    const {registrationDate, isUserDataSent} = otherInfo;
    const {applicationDeleteMessage, applicationConfirmAlert} = localisations.pages.userProfile;
    const {pathname} = useLocation();
    const redirectionPath = "/userList";
    const redirect = () => navigate(redirectionPath);
    const dispatch = useDispatch();

    let path = `/${chatID}/editProfile`;
    if (pathname.includes("userList")) path = `/userList/${chatID}/editProfile`;

    function renderRequirementsBlock() {
        return (<Grid item xs={12} md={6}>
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
        </Grid>)
    }

    function renderRegistrationStatusInfo() {
        return (
            <>
                {isUserDataSent ?
                    <>
                        <Typography sx={{mb: 1.5}}>
                            {"Дата регистрации: " + registrationDate}
                        </Typography>
                        {isUserConfirmed ?
                            null :
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

    function renderButtonsBlock() {
        return (
            isAdmin ? null :
            <>
                {isSuperAdmin && !isUserConfirmed &&
                    <IconButton
                    aria-label="done"
                    sx={{marginRight: "8px"}}
                    onClick={onConfirmPerson}
                >
                    <DoneOutlineRoundedIcon color="success"/>
                </IconButton>}
                <Button component={Link} to={path} variant="outlined" color="primary" size="small" disableElevation>
                    Редактировать
                </Button>
                {isSuperAdmin && <IconButton
                    aria-label="delete"
                    sx={{marginLeft: "8px"}}
                    onClick={onDeletePerson}
                >
                    <DeleteIcon color="error"/>
                </IconButton>}
            </>
        )
    }

    function onDeletePerson() {
        tg.showConfirm(applicationDeleteMessage, popupCallBack)
    }

    function popupCallBack() {
            redirect();
            dispatch(deletePersonAction(chatID, accountChatID));
    }

    function onConfirmPerson() {
        if(!isUserDataSent) {
            tg.showAlert(applicationConfirmAlert);
        } else {
            dispatch(confirmPersonAction(chatID, accountChatID));
        }
    }

    return <Profile displayedData={displayedData}
                    role={accountData.type}
                    requirementsBlock={renderRequirementsBlock()}
                    registrationBlock={renderRegistrationStatusInfo()}
                    buttonsBlock={renderButtonsBlock()}
                    redirectionPath={redirectionPath}
    />;
}