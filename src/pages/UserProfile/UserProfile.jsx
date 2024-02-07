import * as React from 'react';
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Profile from "../../components/Profile/Profile";
import {
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    IconButton,
    ListItem,
    ListItemIcon,
} from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Button from "@mui/material/Button";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import constants from "../../assets/constants/constants";
import localisations from "../../assets/constants/localisations/localisations";
import {useTelegram} from "../../hooks/useTelegram";
import {confirmPersonAction, deletePersonAction, updatePersonDataAction} from "../../redux/actions";
import ListItemText from "@mui/material/ListItemText";

export default function UserProfile() {
    const {chatID} = useParams();
    const {tg} = useTelegram();
    const navigate = useNavigate();
    let displayedData = useSelector(state => {
        const {users, admins, employees} = state.users;
        const user = users.find(el => el.chatID === +chatID);
        const admin = admins.find(el => el.chatID === +chatID);
        const employ = employees.find(el => el.chatID === +chatID);
        return user || admin || employ;
    });
    const {accountData, accountChatID} = useSelector(state => state.users);
    const role = accountData.role;
    const isAdmin = role === constants.userRoles.admin;
    const isSuperAdmin = role === constants.userRoles.superAdmin;
    const {otherInfo, isUserConfirmed, requirements} = displayedData;
    const {registrationDate, isUserDataSent} = otherInfo;
    const {applicationDeleteMessage, applicationConfirmAlert} = localisations.pages.userProfile;
    const {pathname} = useLocation();
    const redirectionPath = "/userList";
    const redirect = () => navigate(-1);
    const dispatch = useDispatch();

    let path = pathname + "/editProfile";

    function renderRequirementsBlock() {
        return (
            <Container sx={{padding: 2, width: "auto"}}>
                {<FormGroup>
                    {requirements.map((el, i) => {
                        return (
                            <FormControlLabel
                                key={i}
                                control={
                                <Checkbox
                                    checked={el.done}
                                    id={`${i}`}
                                    disabled={!isAdmin && !isSuperAdmin}
                                />
                            }
                                label={el.name}
                                onChange={onToggleCheckBox}
                            />)
                    })}
                </FormGroup>
                }
            </Container>)
    }

    function onToggleCheckBox(e) {
        const id = +e.target.attributes.id.value;
        const {checked} = e.target;
        const data = requirements.map((el, i) => {
            if (i === id) el.done = checked;
            return el;
        })
        dispatch(updatePersonDataAction(chatID, accountChatID, {requirements: data}));
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

    function popupCallBack(pressedButtonIsOk) {
        if (pressedButtonIsOk) {
            redirect();
            dispatch(deletePersonAction(chatID, accountChatID));
        }
    }

    function onConfirmPerson() {
        if (!isUserDataSent) {
            tg.showAlert(applicationConfirmAlert);
        } else {
            dispatch(confirmPersonAction(chatID, accountChatID));
        }
    }

    return <Profile displayedData={displayedData}
                    role={accountData.role}
                    requirementsBlock={renderRequirementsBlock()}
                    registrationBlock={renderRegistrationStatusInfo()}
                    buttonsBlock={renderButtonsBlock()}
                    redirectionPath={redirectionPath}
    />;
}