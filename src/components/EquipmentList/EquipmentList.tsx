import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect} from "react";
import {updateEquipmentWorkingStatusAction} from "../../redux/actions";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import localisations from "../../assets/constants/localisations/localisations";
import {createPersonName} from "../../methods/helpers";
import {IEquipmentListItem} from "../../types/interfaces";
import { useTypedSelector, useTypedDispatch } from "../../redux/index.ts";

interface IEquipmentListProps {
    list: IEquipmentListItem[]
}

const EquipmentList = (props: IEquipmentListProps) => {

    const {list} = props;
    const {accountChatID, accountData, persons, admins} = useTypedSelector(state => state.persons);
    const {equipmentsDataIsUpdated, operatingEquipment} = useTypedSelector(state => state.equipments);
    let navigate = useNavigate();
    const dispatch = useTypedDispatch();
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

            const {filesUrl, id, imgUrl, model, name} = el;
            let started, startedByAnotherPerson, workingPerson, personName;

            if (accountChatID === workingPersonChatID) started = true;
            if (!started && isUsing.length > 0) startedByAnotherPerson = true;
            if (startedByAnotherPerson) {
                workingPerson = persons.find(el => el.chatID === workingPersonChatID);
                if(!workingPerson) workingPerson = admins.find(el => el.chatID === workingPersonChatID);
                personName = createPersonName(workingPerson);
            }

            function renderWorkingPersonButtons() {
                return started ?
                    <Button size="small" onClick={() => onClickEnd(el)}>Завершить</Button> :
                    <Button size="small" onClick={() => onClickStart(el)}>Старт</Button>
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

    return equipmentsDataIsUpdated ? renderEquipmentList() : <CircularProgress/>
};

export default EquipmentList;