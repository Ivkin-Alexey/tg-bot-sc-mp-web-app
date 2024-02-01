import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations/localisations";
import ListPage from "../ListPage/ListPage";

const EmployList = () => {
    const {employees} = useSelector(state => state.users);
    const {subHeader, listIsEmpty} = localisations.pages.employeesList;
    return <ListPage subHeader={subHeader} personList={employees} listItemPath={"/employList/"} listIsEmptyMsg={listIsEmpty}/>;
};

export default EmployList;