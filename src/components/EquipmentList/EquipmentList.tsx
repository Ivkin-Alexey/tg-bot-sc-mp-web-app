import React, { useState } from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import localisations from "../../assets/constants/localisations/localisations";
import {createPersonName} from "../../methods/helpers";
import {IEquipment, IOperatingEquipment} from "../../models/equipments";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useFetchOperatingEquipmentsQuery, useStartUsingEquipmentMutation, useEndUsingEquipmentMutation} from "../../store/api/equipments.api"
import { RootState } from "@reduxjs/toolkit/query";
import { TChatID, TEquipmentID } from "../../models/main";
import { useLazyFetchPersonQuery } from "../../store/api/persons.api";

interface IEquipmentListProps {
    list: IEquipment[]
}

const EquipmentList = (props: IEquipmentListProps) => {

    const {list} = props;
    const {accountData} = useAppSelector(state => state.persons);
    const {isLoading, data: operatingEquipments: IEquipmentListByCategories} = useFetchOperatingEquipmentsQuery()
    const {fetchPerson, data} = useLazyFetchPersonQuery()
    const [equipmentList, setEquipmentList] = useState<Array<IOperatingEquipment | IEquipment> | null>(null)
    let navigate = useNavigate();
    const {tg} = useTelegram();

    const redirect = () => navigate(-1);

    useEffect(() => {
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
        convertEquipmentList()
    }, []);

    function convertEquipmentList() {
        if(!operatingEquipments) return
        setEquipmentList(() => list.map(callBack))

        function callBack(el: IEquipment): IEquipment | IOperatingEquipment {
            if(!operatingEquipments) return
            const operatingItem = operatingEquipments[el.category]?.find(item => item.id === el.id)
            if(operatingItem) return operatingItem
            else return el
        }

    }

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

        if(!equipmentList) return

        return equipmentList.length > 0 ? equipmentList.map(el => {

            const {filesUrl, id, imgUrl, model, name} = el;

            let isStarted: boolean = false;
            let isStartedByAnotherPerson: boolean = false;
            let personName
            let workingPersonChatID: null | TChatID = null;
            
            
            if (t) {

            }
                
                && accountData?.chatID             
                else if (chatID) isStartedByAnotherPerson = true;) isStarted = true;
            else if (chatID) isStartedByAnotherPerson = true;
            if (isStartedByAnotherPerson) {
                personName = createPersonName(await fetchPerson(chatID));
            }

            function renderWorkingPersonButtons(equipmentID: TEquipmentID, chatID: TChatID) {
                    return isStarted ?
                    <Button size="small" onClick={() => end({chatID, equipmentID})}>Завершить</Button> :
                    <Button size="small" onClick={() => start({chatID, equipmentID})}>Старт</Button>
            }

            return (
                <Card key={id}>
                    {isStartedByAnotherPerson && <Chip label={`Использует ${personName}`} color="primary" sx={{marginTop: "15px"}}/>}
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
                        {!isStartedByAnotherPerson && accountData && renderWorkingPersonButtons(id, accountData.chatID,)}
                        <Button size="small" onClick={() => onClickDownloadFiles(filesUrl)}>Скачать файлы</Button>
                    </CardActions>
                </Card>
            )
        }) : localisations.components.equipmentList.listIsEmpty
    }

    return isLoading ? <CircularProgress/> : renderEquipmentList
};

export default EquipmentList;