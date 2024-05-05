import React, {useState} from 'react';
import {statistic} from "../../assets/db/db";
import ListSubheader from "@mui/material/ListSubheader";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import List from "@mui/material/List";
import {ListItem, Stack} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

export default function Statistic({list, title}) {

    let navigate = useNavigate();
    const redirect = () => navigate('/');
    const {tg} = useTelegram();

    const renderItem = (el, i) => {
        return (
            <ListItem key={i}>
                <ListItemText
                    primary={el}
                />
            </ListItem>
        )
    }

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    return (
        <Stack
            direction="column"
            spacing={2}
            width={"350px"}
        >
            <ListSubheader component="div" id="nested-list-subheader">
                {title}
            </ListSubheader>
            <List dense={true}>{list.map((el, i) => renderItem(el, i))}</ List>
        </Stack>)
};