import * as React from 'react';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Profile from "../../components/Profile/Profile";
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import constants from "../../assets/constants/constants";
import localisations from "../../assets/constants/localisations/localisations";
import Typography from "@mui/material/Typography";
import {useTelegram} from "../../hooks/useTelegram";
import {confirmPersonAction, deletePersonAction} from "../../redux/actions";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

export default function AdminProfile() {
    const {tg} = useTelegram();
    const {chatID} = useParams();
    const navigate = useNavigate();
    let displayedData = useSelector(state => {
        const {admins, employees} = state.users;
        const admin = admins.find(el => el.chatID === +chatID);
        const employ = employees.find(el => el.chatID === +chatID);
        return admin || employ;
    });
    const displayedDataRole = displayedData.role;
    const {accountData, accountChatID} = useSelector(state => state.users);
    const role = accountData.role;
    const isUser = role === constants.userRoles.user;
    const isSuperAdmin = role === constants.userRoles.superAdmin;
    const isOwnAccount = +chatID === accountData.chatID;
    const redirectionPath = "/adminList";
    const {applicationDeleteAlert, roleTitle} = localisations.pages.adminProfile;
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const redirect = () => navigate(redirectionPath);
    let path = `/${chatID}/editProfile`;
    if (pathname.includes("adminList")) path = `/adminList/${chatID}/editProfile`;
    const {applicationConfirmAlert} = localisations.pages.userProfile;

    const {otherInfo, isUserConfirmed} = displayedData;
    const {isUserDataSent} = otherInfo;

    function renderRoleBlock() {
        return <Typography sx={{fontSize: 14, mb: 1.5}}>
            {displayedData.role ? "Роль: " + roleTitle[displayedData.role] : <b>Роль не указана</b>}
        </Typography>
    }

    function onDeletePerson() {
        tg.showConfirm(applicationDeleteAlert, popupCallBack)
    }

    function onConfirmPerson() {
        if (!isUserDataSent) {
            tg.showAlert(applicationConfirmAlert);
        } else {
            dispatch(confirmPersonAction(chatID, accountChatID));
        }
    }

    function popupCallBack(pressedButtonIsOk) {
        if(pressedButtonIsOk) {
            redirect();
            dispatch(deletePersonAction(chatID, accountChatID));
        }
    }

    function renderButtonsBlock() {
        return (
            isUser ? null :
                <>
                    {isSuperAdmin && !isUserConfirmed &&
                        <IconButton
                            aria-label="done"
                            sx={{marginRight: "8px"}}
                            onClick={onConfirmPerson}
                        >
                            <DoneOutlineRoundedIcon color="success"/>
                        </IconButton>}
                    {(isOwnAccount || (isSuperAdmin && displayedDataRole !== constants.userRoles.superAdmin)) &&
                        <Button component={Link} to={path} variant="outlined" color="primary" size="small"
                                disableElevation>
                            Редактировать
                        </Button>}
                    {isSuperAdmin && displayedDataRole !== constants.userRoles.superAdmin &&
                        <IconButton
                            aria-label="delete"
                            sx={{marginLeft: "8px"}}
                            onClick={onDeletePerson}
                        >
                            <DeleteIcon color="error"/>
                        </IconButton>}
                </>
        )
    }

    return <Profile
        displayedData={displayedData}
        role={accountData.role}
        buttonsBlock={renderButtonsBlock()}
        adminRoleBlock={renderRoleBlock()}
        redirectionPath={redirectionPath}
    />;
}