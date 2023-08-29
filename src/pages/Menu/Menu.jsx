import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";

export default function Menu() {

    const {tg, onClose} = useTelegram();

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, []);

    return (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                          Меню:
                      </ListSubheader>
                  }>
                <ListItemLink to="/equipment" primary="Оборудование"/>
                <ListItemLink to="/applications" primary="Заявки на исследование"/>
                <ListItemLink to="/reagents" primary="Заявки на реактивы"/>
                <ListItemLink to="/profile" primary="Профиль"/>
            </List>
    );
}