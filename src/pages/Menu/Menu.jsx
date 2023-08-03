import * as React from 'react';
import {Box, ListItem, ListItemIcon, Paper} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {Link} from 'react-router-dom';

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
        <Box sx={{width: 360}}>
            <Paper elevation={0}>
                <List aria-label="secondary mailbox folders">
                    <ListItemLink to="/equipmentCategories" primary="Оборудование"/>
                    <ListItemLink to="/applications" primary="Заявки на исследование"/>
                </List>
            </Paper>
        </Box>
    );
}