import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import './EquipmentList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {endWorkWithEquipment, startWorkWithEquipment} from "../../methods/requestsToServer";
import {updateEquipmentWorkingStatusAction} from "../../redux/actions";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

const EquipmentList = () => {

    const {category} = useParams();
    const {accountChatID, accountData} = useSelector(state => state.users);
    const {equipments, equipmentsDataIsUpdated} = useSelector(state => state.equipments);
    const list = equipments[category];

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {tg} = useTelegram();

    const redirect = () => navigate('/equipment');

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    function onClickStart(equipment) {
        const type = "start";
        dispatch(updateEquipmentWorkingStatusAction(accountChatID, accountData, equipment, type));
    }

    function onClickEnd(equipment) {
        const type = "end";
        dispatch(updateEquipmentWorkingStatusAction(accountChatID, accountData, equipment, type));
    }

    function onClickDownloadFiles(url) {
        tg.openLink(url)
    }

    return (
        equipmentsDataIsUpdated ?
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
        }) : <CircularProgress/>
    )
};

export default EquipmentList;