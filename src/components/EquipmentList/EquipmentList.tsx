import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import localisations from "../../assets/constants/localisations/localisations";
import {createPersonName} from "../../methods/helpers";
import {IEquipmentListItem} from "../../models/equipments";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/useActions";
import {useFetchOperatingEquipmentsQuery, useStartUsingEquipmentMutation, useEndUsingEquipmentMutation} from "../../store/api/equipments.api"
import { RootState } from "@reduxjs/toolkit/query";
import { TEquipmentID } from "../../models/main";

interface IEquipmentListProps {
    list: IEquipmentListItem[]
}

const EquipmentList = (props: IEquipmentListProps) => {

    const {list} = props;
    const {accountData} = useAppSelector(state => state.persons);
    const {isLoading, data: operatingEquipments} = useFetchOperatingEquipmentsQuery()
    const [startEquipment, {isLoading: isUpdated, data}] = useStartUsingEquipmentMutation()
    let navigate = useNavigate();
    const {tg} = useTelegram();

    const redirect = () => navigate(-1);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    const [start, startResult] = useStartUsingEquipmentMutation()
    const [end, endResult] = useEndUsingEquipmentMutation()

    function onClickDownloadFiles(url: string) {
        tg.openLink(url)
    }

    function checkIsEquipmentWorking(equipmentID: TEquipmentID) {
        if (!Array.isArray(operatingEquipments)) {
            return false;
        }
        return operatingEquipments.some(el => el.equipmentID === equipmentID);
    }

    function renderEquipmentList() {
        return list.length > 0 ? list.map(el => {

            const {filesUrl, id, imgUrl, model, name} = el;
            let started, startedByAnotherPerson, workingPerson, personName;

            if (accountData?.chatID === workingPersonChatID) started = true;
            if (!started && isUsing.length > 0) startedByAnotherPerson = true;
            if (startedByAnotherPerson) {
                workingPerson = persons.find(el => el.chatID === workingPersonChatID);
                if(!workingPerson) workingPerson = admins.find(el => el.chatID === workingPersonChatID);
                personName = createPersonName(workingPerson);
            }

            function renderWorkingPersonButtons(equipmentID: TEquipmentID) {
                return started ?
                    <Button size="small" onClick={() => end(equipmentID, accountData.chatID)}>Завершить</Button> :
                    <Button size="small" onClick={() => start(equipmentID, accountData.chatID)}>Старт</Button>
            }

            return (
                <Card key={id}>
                    {startedByAnotherPerson && <Chip label={`Использует ${personName}`} color="primary" sx={{marginTop: "15px"}}/>}
                    <CardMedia
                        component="img"
                        alt={name}
                        height="140"
                        image={imgUrl}
                    />
                    <CardContent sx={{paddingTop: 0, paddingBottom: 0}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{fontSize: "1rem"}}>
                            {name + " " + model}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {!startedByAnotherPerson && renderWorkingPersonButtons()}
                        <Button size="small" onClick={() => onClickDownloadFiles(filesUrl)}>Скачать файлы</Button>
                    </CardActions>
                </Card>
            )
        }) : localisations.components.equipmentList.listIsEmpty
    }

    return isLoading ? <CircularProgress/> : renderEquipmentList
};

export default EquipmentList;