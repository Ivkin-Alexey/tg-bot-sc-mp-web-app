import React from 'react';
import {equipment} from "../../assets/db/db";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import img from'../../assets/img/Vega 3 LMH.jpeg';
import './EquipmentList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {useSelector} from "react-redux";

const EquipmentList = () => {

    const {category} = useParams();
    const {equipments} = useSelector(state => state.equipments);
    const list = equipments[category];

    let navigate = useNavigate();
    const {tg} = useTelegram();

    const redirect = () => navigate('/equipment');

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function onClickStart(equipment) {
        console.log(equipment);
    }

    return (
            list.map((el, i) => {
                const {brand, category, filesUrl, id, imgUrl, model, name} = el;

                return (
                    <Card key={i}>
                        <CardMedia
                            component="img"
                            alt={name}
                            height="140"
                            image={imgUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name + " " + model}
                            </Typography>
                            {/*<Typography variant="body2" color="text.secondary">*/}
                            {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                            {/*    species, ranging across all continents except Antarctica*/}
                            {/*</Typography>*/}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => onClickStart(el)}>Старт</Button>
                            <Button size="small">Скачать файлы</Button>
                        </CardActions>
                    </Card>
                )
            })
    )
};

export default EquipmentList;