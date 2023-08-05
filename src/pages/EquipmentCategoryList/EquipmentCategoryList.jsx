import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {equipment} from '../../assets/db';
import {useNavigate} from "react-router-dom";
import ListItemLink from "../../components/ListItemLink/ListItemLink";

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
