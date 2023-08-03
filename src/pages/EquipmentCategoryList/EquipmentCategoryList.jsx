import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {equipment} from '../../assets/db';

export default function EquipmentCategoryList() {

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Выберите категорию оборудования:
                </ListSubheader>
            }
        >
            {equipment.map(el => {
                return(
                <ListItemButton>
                    <ListItemText primary={el.category} />
                </ListItemButton>)
            })}
        </List>
    );
}
