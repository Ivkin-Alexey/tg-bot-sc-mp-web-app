import React from 'react';
import {equipment} from "../../assets/db";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const EquipmentList = () => {
    return (
        equipment[1].list.map((el, i) => {
            return (<Card sx={{maxWidth: 345}} key={i}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt={el}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {el}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>)
        })
    )
};

export default EquipmentList;