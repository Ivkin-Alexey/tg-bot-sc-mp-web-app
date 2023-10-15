import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {Divider} from "@mui/material";
import {useSelector} from "react-redux";
import constants from "../../assets/constants/constants";

export default function Menu() {

    const {admin, superAdmin} = constants.userRoles;
    const {tg, onClose, chatID = constants.defaultUserChatID} = useTelegram();
    const {type} = useSelector(state => state.users.accountData);
    const isAdmin = type === admin || type  === superAdmin;

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
                <ListItemLink to="/userList" primary="Сотрудники лаборатории"/>
                <ListItemLink to="/adminList" primary="Администраторы"/>
                {/*<ListItemLink to="/statistic/activeEmployees" primary="Активные работники"/>*/}
                {/*<ListItemLink to="/statistic/activeEmployees" primary="Активные работники"/>*/}
            </>
        )
    }

    const renderStepperPage = () => {
        return (
            <>
                <ListItemLink to="/stepper" primary="Допуск в лабораторию"/>
                <Divider/>
            </>
        )
    }

    return (
        <List sx={{width: '100%', maxWidth: 350, bgcolor: 'background.paper'}}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader" sx={{lineHeight: "20px", position: "initial"}}>
                      Меню:
                  </ListSubheader>
              }>
            {/*{renderStepperPage()}*/}
            {/*<ListItemLink to="/equipment" primary="Оборудование"/>*/}
            {/*<ListItemLink to="/applications" primary="Заявки на исследование"/>*/}
            {/*<ListItemLink to="/reagents" primary="Заявки на реактивы"/>*/}
            <ListItemLink to={`/${chatID}`} primary="Мой профиль"/>
            {isAdmin && renderAdminPages()}
        </List>
    );
}