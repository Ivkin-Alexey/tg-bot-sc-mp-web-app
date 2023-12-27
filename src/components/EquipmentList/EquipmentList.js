import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateEquipmentWorkingStatusAction} from "../../redux/actions";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import localisations from "../../assets/constants/localisations";

const EquipmentList = (props) => {

    const {list} = props;
    const {accountChatID, accountData} = useSelector(state => state.users);
    const {equipmentsDataIsUpdated} = useSelector(state => state.equipments);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {tg} = useTelegram();

    const redirect = () => navigate(-1);

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

    function renderEquipmentList() {
        return list.length > 0 ? list.map(el => {
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
        }) : localisations.components.equipmentList.listIsEmpty
    }

    return equipmentsDataIsUpdated ? renderEquipmentList() : <CircularProgress/>
};

export default EquipmentList;