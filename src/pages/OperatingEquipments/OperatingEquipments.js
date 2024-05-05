import React from 'react';
import EquipmentList from "../../components/EquipmentList/EquipmentList.tsx";
import {useSelector} from "react-redux";

const OperatingEquipments = () => {

    const {operatingEquipment} = useSelector(state => state.equipments);

    return <EquipmentList list={operatingEquipment}/>
};

export default OperatingEquipments;