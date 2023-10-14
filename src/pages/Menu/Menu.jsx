import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {Chip, Divider} from "@mui/material";
import {fetchUsers} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import constants from "../../assets/constants/constants";

export default function Menu() {

    const {user, admin, superAdmin} = constants.userRoles;
    const {tg, onClose, userChatID = constants.defaultUserChatID} = useTelegram();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers(userChatID));
    }, []);

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', onClose);
        return () => {
            tg.offEvent('backButtonClicked', onClose);
        }
    }, []);

    const {type} = useSelector(state => state.users.userData);

    const renderAdminPages = () => {
        return (
            <>
                <Divider/>
                <ListItemLink to="/userList" primary="Сотрудники лаборатории"/>
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
            <ListItemLink to={`/${userChatID}`} primary="Мой профиль"/>
            {(type === admin || type  === superAdmin) && renderAdminPages()}
        </List>
    );
}