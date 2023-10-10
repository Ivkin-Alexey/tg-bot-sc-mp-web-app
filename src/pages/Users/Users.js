import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from "../../redux/actions";

const Users = () => {

    let navigate = useNavigate();
    const redirect = () => navigate('/');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    const {users} = useSelector(state => state.users);

    function createName(user) {
        const {firstName, lastName, patronymic} = user;
        let name = "";
        if(lastName) {
            name+=lastName;
            if(firstName) name+= " " + firstName[0] + ".";
            if(patronymic) name+=patronymic[0] + ".";
        }
        return name;
    }

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Список пользователей:
                </ListSubheader>
            }
        >
            {users && users.map((el, i) => {

                const name = createName(el);

                return (
                    <ListItemLink
                        to={`/userList/${el.chatID}`}
                        primary={name}
                        key={i}
                        onClick={() => navigate(`/userList/${el.chatID}`)}
                    />
                )
            })}
        </List>
    );
};

export default Users;