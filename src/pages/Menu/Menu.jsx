import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {Chip, Divider} from "@mui/material";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import {useSelector} from "react-redux";
import constants from "../../assets/constants/constants";

export default function Menu() {

    const {admin, superAdmin, user} = constants.userRoles;
    const {tg, onClose, accountChatID = constants.defaultUserChatID} = useTelegram();
    const state = useSelector(state => state.users);
    const {operatingEquipment} = useSelector(state => state.equipments);

    const {newUsers, users, admins, accountData} = state;
    const role = accountData.role;
    const isAdmin = role === admin || role === superAdmin;
    const isUser = role === user;

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', onClose);
        return () => {
            tg.offEvent('backButtonClicked', onClose);
        }
    }, []);

    const renderAdminPages = () => {
        return (
            <>
                <Divider/>
                <ListItemLink to="/newUserList" primary={`Новые заявки (${newUsers?.length})`}/>
                <ListItemLink to="/userList" primary={`Обучающиеся (${users?.length})`}>
                    {newUsers?.length > 0 && <Chip label={newUsers?.length} color="error" size="small" sx={{marginRight: "10px"}}/>}
                </ListItemLink>
                <ListItemLink to="/adminList" primary={`Администраторы (${admins?.length})`}/>
                <ListItemLink to="/applications" primary="Заявки на исследование"/>
                <ListItemLink to="/reagents" primary="Заявки на реактивы"/>
                {/*<ListItemLink to="/statistic/activeEmployees" primary="Активные работники"/>*/}
                {/*<ListItemLink to="/statistic/activeEmployees" primary="Активные работники"/>*/}
            </>
        )
    }

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                      Меню:
                  </ListSubheader>
              }>
            <ListItemLink to={`/${accountChatID}`} primary="Мой профиль"/>
            {isUser && <ListItemLink to="/stepper" primary="Допуск в лабораторию"/>}
            <ListItemLink to="/equipment" primary="Оборудование"/>
            <ListItemLink to="/operatingEquipment" primary={`Оборудование в работе (${operatingEquipment?.length})`}/>
            {isAdmin && renderAdminPages()}
        </List>
    );
}