import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {equipment} from '../../assets/db';
import {Box, ListItem, ListItemIcon} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

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

export default function EquipmentCategoryList() {

    let navigate = useNavigate();

    return (

        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Выберите категорию оборудования:
                </ListSubheader>
            }
        >
            {equipment.map((el, i) => {
                return (
                    <ListItemLink
                        to={`/equipment/${el.category.en}`}
                        primary={el.category.ru}
                        key={i}
                        onClick={() => navigate(`/equipment/${el.category.en}`)}/>
                )
            })}
        </List>
    );
}
