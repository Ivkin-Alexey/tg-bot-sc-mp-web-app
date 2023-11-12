import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../ListItemLink/ListItemLink";
import {Chip, Collapse, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {useSelector} from "react-redux";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import localisations from "../../assets/constants/localisations";
import {createUserName} from "../../methods/helpers";

const NestedList = () => {

    const {subHeader, listIsEmpty} = localisations.pages.nestedList;
    const {researches} = useSelector(state => state.researches);
    const {users} = useSelector(state => state.users);
    const navigate = useNavigate();
    const redirect = () => navigate(-1);
    const {tg} = useTelegram();
    const listItemPath = "/userList/";

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    const defaultOpenLists = researches.reduce((acc, cur) => ({...acc, [cur.value]: false}), {});

    const [openLists, setOpenLists] = useState(defaultOpenLists);

    function handleClick(name) {
        setOpenLists(state => ({...state, [name]: !state[name]}));
    }

    function renderSubItemList(subItems) {
        return (
            <List component="div" disablePadding>
                {subItems.map(el => {
                    const isNew = el.isUserConfirmed === false;
                    return <ListItemLink
                        to={listItemPath + el.chatID}
                        primary={createUserName(el)}
                        key={el.chatID}
                        onClick={() => navigate(listItemPath + el.chatID)}
                    >{isNew && <Chip label="Новый" color="error" size="small" sx={{marginRight: "10px"}}/>}
                    </ListItemLink>
                })}
            </List>
        )
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
            {researches ? researches.map((el, i) => {
                const value = el.value;
                const isOpen = openLists[value];
                const subItems = users.filter(user => user.research === value);
                const newUsersNumber = subItems.filter(user => user.isUserConfirmed === false).length;
                return (
                    <div key={i}>
                        <ListItem onClick={() => handleClick(value)}>
                            <ListItemText primary={value + ` (${subItems.length})`}/>
                            {newUsersNumber > 0 ? <Chip label={newUsersNumber} color="error" size="small" sx={{marginRight: "10px"}}/> : null}
                            {subItems.length > 0 ? (isOpen ? <ExpandLess/> : <ExpandMore/>) : null}
                        </ListItem>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            {renderSubItemList(subItems)}
                        </Collapse>
                    </div>
                )
            }) : listIsEmpty}
        </List>
    );
};

export default NestedList;