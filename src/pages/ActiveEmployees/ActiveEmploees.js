import React from 'react';
import Statistic from "../../components/Statistic/Statistic";
import {statistic} from "../../assets/db/db";

const ActiveEmployees = () => {

    const list = statistic.map(el => el.user + ': ' + el.equipment);

    return (
        <Statistic list={list} title="Активные работники"/>
    );
};

export default ActiveEmployees;