import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useEffect, useState} from "react";
import {useTelegram} from "../../hooks/useTelegram";
import {Chip, Divider} from "@mui/material";
import {fetchUsers} from "../../redux/actions";
import {useDispatch} from "react-redux";
import constants from "../../assets/constants/constants";

export default function Menu() {

    const {tg, onClose, userChatID} = useTelegram();

    const [isAdmin, setIsAdmin] = useState(true);
    const [isNew, setIsNew] = useState(true);
    const dispatch = useDispatch();
    const {defaultUserChatID} = constants;

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, []);

    useEffect(() => {
        console.log(userChatID, defaultUserChatID);
        dispatch(fetchUsers(userChatID ?? defaultUserChatID));
    }, []);

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
                  <ListSubheader component="div" id="nested-list-subheader">
                      Меню:
                  </ListSubheader>
              }>
            {isNew && renderStepperPage()}
            {/*<ListItemLink to="/equipment" primary="Оборудование"/>*/}
            {/*<ListItemLink to="/applications" primary="Заявки на исследование"/>*/}
            {/*<ListItemLink to="/reagents" primary="Заявки на реактивы"/>*/}
            <ListItemLink to="/profile" primary="Мой профиль"/>
            {isAdmin && renderAdminPages()}
        </List>
    );
}