import React from 'react';
import './Equipments.css';
import EquipmentList from "../../components/EquipmentList/EquipmentList.tsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Equipments = () => {

    const {category} = useParams();
    const {equipments} = useSelector(state => state.equipments);
    const list = equipments[category];

    return <EquipmentList list={list}/>;
}

export default Equipments;