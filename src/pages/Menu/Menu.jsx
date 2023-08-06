import * as React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemLink from "../../components/ListItemLink/ListItemLink";

export default function Menu() {

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
                <ListItemLink to="/reagents" primary="Реактивы"/>
                <ListItemLink to="/profile" primary="Профиль"/>
            </List>
    );
}