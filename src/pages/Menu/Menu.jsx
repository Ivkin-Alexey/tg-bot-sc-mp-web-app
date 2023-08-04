import * as React from 'react';
import {Box, ListItem, ListItemIcon, Paper} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {Link} from 'react-router-dom';
import ListSubheader from "@mui/material/ListSubheader";

export default function Menu() {

    function ListItemLink(props) {
        const {icon, primary, to} = props;

        return (
            <li>
                <ListItem button component={Link} to={to}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={primary}/>
                </ListItem>
            </li>
        );
    }

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
                <ListItemLink to="/form" primary="Мои данные"/>
            </List>
    );
}