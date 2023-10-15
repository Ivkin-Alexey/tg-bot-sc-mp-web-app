import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";

const ListPage = (props) => {

    const {subHeader, personList, listItemPath} = props;
    const navigate = useNavigate();
    const redirect = () => navigate('/');
    const {tg} = useTelegram();
    console.log(props);

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function createName(user) {
        const {firstName, lastName, patronymic} = user;
        let name = "";
        if(lastName) {
            name+=lastName;
            if(firstName) name+= " " + firstName[0] + ".";
            if(patronymic) name+=patronymic[0] + ".";
        } else if (firstName) {
            name+=firstName;
            if(patronymic) name+= " " + patronymic;
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
                    {subHeader}
                </ListSubheader>
            }
        >
            {personList && personList.map((el, i) => {
                const name = createName(el);
                if(!name) return;
                return (
                    <ListItemLink
                        to={listItemPath + el.chatID}
                        primary={name}
                        key={i}
                        onClick={() => navigate(listItemPath + el.chatID)}
                    />
                )
            })}
        </List>
    );
};

export default ListPage;