import React from 'react';
import './Equipments.css';
import EquipmentList from "../../components/EquipmentList/EquipmentList.tsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Equipments = () => {

    const {category} = useParams();

    return <EquipmentList category={category}/>;
}

export default Equipments;