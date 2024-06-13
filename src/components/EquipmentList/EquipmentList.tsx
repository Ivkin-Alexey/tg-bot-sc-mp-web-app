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
import {useFetchAllOperatingEquipmentsQuery, useStartUsingEquipmentMutation, useEndUsingEquipmentMutation, useFetchOperatingEquipmentsByCategoryQuery} from "../../store/api/equipments.api"
import { RootState } from "@reduxjs/toolkit/query";
import { TChatID, TEquipmentID } from "../../models/main";
import { useLazyFetchPersonQuery } from "../../store/api/persons.api";

interface IEquipmentListProps {
    category: string
}

const EquipmentList = (props: IEquipmentListProps): React.ReactElement | string => {

    const {category} = props;
    const {accountData} = useAppSelector(state => state.persons);
    const {isLoading, data: operatingEquipments} = useFetchOperatingEquipmentsByCategoryQuery(category);
    const [fetchPerson, data] = useLazyFetchPersonQuery();
    const [equipmentList, setEquipmentList] = useState<Array<IOperatingEquipment | IEquipment> | null>(null)
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

    function renderEquipmentList() {

        if(!Array.isArray(equipmentList)) return localisations.components.equipmentList.listIsEmpty;
        
        else return equipmentList?.map(el => {

            const {filesUrl, id, imgUrl, model, name} = el;

            const operatingEquipment = operatingEquipments?.find(el => el.id === id);

            let isStarted: boolean = false;
            let isStartedByAnotherPerson: boolean = false;
            let personName
            let workingPersonChatID: null | TChatID = null;
            
            if (accountData?.chatID === operatingEquipment?.chatID) isStarted = true;
            else if (operatingEquipment?.chatID) isStartedByAnotherPerson = true;

            if (isStartedByAnotherPerson && operatingEquipment) {
                personName = createPersonName(fetchPerson(operatingEquipment.chatID));
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
        })
    };

    return isLoading ? <CircularProgress/> : <>renderEquipmentList()</>
};

export default EquipmentList;