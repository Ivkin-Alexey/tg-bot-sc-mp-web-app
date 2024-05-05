import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {useNavigate} from "react-router-dom";
import ListItemLink from "../../components/ListItemLink/ListItemLink";
import localisations from '../../assets/constants/localisations/localisations'
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function EquipmentCategoryList() {

    let navigate = useNavigate();
    const {tg} = useTelegram();
    const {categories, operatingEquipments} = useSelector(state => state.equipments);

    const redirect = () => navigate(-1);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        console.log(operatingEquipments);
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
                    {localisations.pages.equipmentCategoryList.header}
                </ListSubheader>
            }
        >
            {categories.map((el, i) => {
                return (
                    <ListItemLink
                        to={`/equipment/${el}`}
                        primary={el}
                        key={i}
                        onClick={() => navigate(`/equipment/${el}`)}/>
                )
            })}
        </List>
    );
}
