import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import './EquipmentList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {endWorkWithEquipment, startWorkWithEquipment} from "../../methods/requestsToServer";

const EquipmentList = () => {

    const {category} = useParams();
    const {accountChatID, accountData} = useSelector(state => state.users);
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
        startWorkWithEquipment(accountChatID, accountData, equipment).then(res => console.log(res));
    }

    function onClickEnd(equipment) {
        endWorkWithEquipment(accountChatID, accountData, equipment).then(res => console.log(res));
    }

    function onClickDownloadFiles(url) {
        tg.openLink(url)
    }

    return (
        list.map(el => {
            const {filesUrl, id, imgUrl, model, name, isUsing} = el;
            const started = isUsing.includes(accountChatID);
            return (
                <Card key={id}>
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
                    </CardContent>
                    <CardActions>
                        {started ?
                            <Button size="small" onClick={() => onClickEnd(el)}>Завершить</Button> :
                            <Button size="small" onClick={() => onClickStart(el)}>Старт</Button>
                        }
                        <Button size="small" onClick={() => onClickDownloadFiles(filesUrl)}>Скачать файлы</Button>
                    </CardActions>
                </Card>
            )
        })
    )
};

export default EquipmentList;