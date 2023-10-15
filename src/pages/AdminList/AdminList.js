import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations";
import ListPage from "../ListPage/ListPage";

const UserList = () => {
    const {admins} = useSelector(state => state.users);
    const {subHeader} = localisations.pages.adminList;
    return <ListPage subHeader={subHeader} personList={admins} listItemPath={"/adminList/"}/>;
};

export default UserList;