import React from 'react';
import {equipment} from "../../assets/db/db";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import img from'../../assets/img/Vega 3 LMH.jpeg';
import './EquipmentList.css';

const EquipmentList = () => {

    const {category} = useParams();
    const {list} = equipment.find(el => el.category.en === category);

    console.log(category);

    return (
            list.map((el, i) => {
                return (
                    <Card key={i}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={img}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {el}
                            </Typography>
                            {/*<Typography variant="body2" color="text.secondary">*/}
                            {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                            {/*    species, ranging across all continents except Antarctica*/}
                            {/*</Typography>*/}
                        </CardContent>
                        <CardActions>
                            <Button size="small">Старт</Button>
                            <Button size="small">Скачать файлы</Button>
                        </CardActions>
                    </Card>
                )
            })
    )
};

export default EquipmentList;