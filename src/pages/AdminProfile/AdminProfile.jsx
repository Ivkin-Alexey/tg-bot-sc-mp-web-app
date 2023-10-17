import * as React from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import Profile from "../../components/Profile/Profile";
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import constants from "../../assets/constants/constants";
import localisations from "../../assets/constants/localisations";
import {deletePerson} from "../../methods/postDataToServer";
import {useTelegram} from "../../hooks/useTelegram";
import Typography from "@mui/material/Typography";

export default function AdminProfile() {
    const {chatID} = useParams();
    const {tg} = useTelegram();
    const displayedData = useSelector(state => state.users.admins.find(el => el.chatID === +chatID));
    const displayedDataRole = displayedData.type;
    const {accountData} = useSelector(state => state.users);
    const role = accountData.type;
    const isUser = role === constants.userRoles.user;
    const isSuperAdmin = role === constants.userRoles.superAdmin;
    const isOwnAccount = +chatID === accountData.chatID;
    const navigationPath = "/adminList";
    const {applicationDeleteAlert, roleTitle} = localisations.pages.adminProfile;
    const navigate = useNavigate();
    const redirect = navigate(navigationPath);
    const {pathname} = useLocation();
    let path = `/${chatID}/editProfile`;
    if (pathname.includes("adminList")) path = `/adminList/${chatID}/editProfile`;

    function onDeletePerson() {
        function callBack(buttonType) {
            if (buttonType === "ok") {
                deletePerson(chatID)
                    .then((res) => {
                        console.log(res);
                        redirect();
                    });

            }
        }
        tg.showPopup({
            message: applicationDeleteAlert,
            buttons: [{type: "ok", text: "Да"}, {type: "cancel", text: "Отмена"}]
        }, callBack)
    }

    function renderRoleBlock() {
        return <Typography sx={{fontSize: 14, mb: 1.5}}>
            {displayedData.type ? "Роль: " + roleTitle[displayedData.type] : <b>Роль не указана</b>}
        </Typography>
    }

    function renderButtonsBlock() {
        return (
            isUser ? null :
                <>
                    {(isOwnAccount || (isSuperAdmin && displayedDataRole !== constants.userRoles.superAdmin)) &&
                    <Button component={Link} to={path} variant="outlined" color="primary" size="small" disableElevation>
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
        role={accountData.type}
        buttonsBlock={renderButtonsBlock()}
        adminRoleBlock={renderRoleBlock()}
    />;
}