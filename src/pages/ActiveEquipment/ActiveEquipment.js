import React from 'react';
import {statistic} from "../../assets/db/db";
import Statistic from "../../components/Statistic/Statistic";

const ActiveEquipment = () => {

    const list = statistic.map(el => el.equipment + ': ' + el.user);

    return (
        <Statistic list={list} title="Активное оборудование"/>
    );
};

export default ActiveEquipment;