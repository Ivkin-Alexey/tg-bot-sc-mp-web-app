import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations/localisations";
import ListPage from "../ListPage/ListPage";

const PersonList = () => {
    const {admins} = useSelector(state => state.persons);
    const {subHeader, listIsEmpty} = localisations.pages.adminList;
    return <ListPage subHeader={subHeader} personList={admins} listItemPath={"/adminList/"} listIsEmptyMsg={listIsEmpty}/>;
};

export default PersonList;