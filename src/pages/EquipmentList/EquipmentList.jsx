import React from 'react';
import {equipment} from "../../assets/db";
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import img from'../../assets/img/Vega 3 LMH.jpeg';

const EquipmentList = () => {

    const {category} = useParams();
    const {list} = equipment.find(el => el.category.en === category);

    console.log(category);

    return (
        <Box sx={{width: 400}}>
            {list.map((el, i) => {
                return (
                    <Card sx={{maxWidth: 345}} key={i}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                width="auto"
                                image={img}
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
                    </Card>
                )
            })
            }
        </Box>
    )
};

export default EquipmentList;