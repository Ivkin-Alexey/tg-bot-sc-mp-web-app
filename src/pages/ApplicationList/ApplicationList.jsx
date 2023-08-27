import React, {useEffect} from 'react';
import './ApplicationList.css';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import {applications} from "../../assets/db/db";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";

const ApplicationList = () => {

    let navigate = useNavigate();
    const redirect = () => navigate('/');
    const {tg} = useTelegram();

    useEffect(() => {
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
                    Выберите исследование:
                </ListSubheader>
            }
        >
            {applications.map((el, i) => {
                return (
                    <ListItemLink
                        to={`/applications/${el.urlName}`}
                        primary={el.name}
                        key={i}
                        onClick={() => navigate(`/applications/${el.urlName}`)}
                    />
                )
            })}
        </List>
    );
};

export default ApplicationList;