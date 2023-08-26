import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {equipment} from '../../assets/db/db';
import {useNavigate} from "react-router-dom";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import localisations from '../../assets/constants/localisations'
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "@types/react";

export default function EquipmentCategoryList() {

    let navigate = useNavigate();
    const {tg} = useTelegram();

    const redirect = () => navigate('/');

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, [])

    return (

        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {localisations.pages.equipmentCategoryList.header}
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
