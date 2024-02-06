import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {createUserName} from "../../methods/helpers";
import {Chip} from "@mui/material";

const ListPage = (props) => {

    const {subHeader, personList, listItemPath, listIsEmptyMsg} = props;
    const navigate = useNavigate();
    const redirect = () => navigate('/');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

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
            {personList.length > 0 ? personList.map((el, i) => {
                const name = createUserName(el);
                const isNew = el.isUserConfirmed === false;
                if(!name) return;
                return (
                    <ListItemLink
                        to={listItemPath + el.chatID}
                        primary={name}
                        key={i}
                        onClick={() => navigate(listItemPath + el.chatID)}
                    >{isNew && <Chip label="Новый" color="error" size="small" sx={{marginRight: "10px"}}/>}
                    </ListItemLink>
                )
            }) : listIsEmptyMsg}
        </List>
    );
};

export default ListPage;