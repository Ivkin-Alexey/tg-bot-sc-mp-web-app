import React from 'react';
import {ListItem, ListItemIcon} from "@mui/material";
import {Link} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";

const ListItemLink = (props) => {

    const {icon, primary, to, children} = props;

    return (
        <li>
            <ListItem button component={Link} to={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary}/>
                {children}
            </ListItem>
        </li>
    );
};

export default ListItemLink;