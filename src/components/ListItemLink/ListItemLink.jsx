import React from 'react';
import {ListItem, ListItemIcon} from "@mui/material";
import {Link} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";

const ListItemLink = (props) => {

    const {icon, primary, to} = props;

    return (
        <li>
            <ListItem button component={Link} to={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
};

export default ListItemLink;