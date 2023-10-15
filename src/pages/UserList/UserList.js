import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations";
import ListPage from "../ListPage/ListPage";

const UserList = () => {
    const {users} = useSelector(state => state.users);
    const {subHeader} = localisations.pages.userList;
    return <ListPage subHeader={subHeader} personList={users} listItemPath={"/userList/"}/>;
};

export default UserList;