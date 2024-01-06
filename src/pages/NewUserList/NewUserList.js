import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations/localisations";
import ListPage from "../ListPage/ListPage";

const NewUserList = () => {
    const {newUsers} = useSelector(state => state.users);
    const {subHeader, listIsEmpty} = localisations.pages.newUserList;
    return <ListPage
        subHeader={subHeader}
        personList={newUsers}
        listItemPath={"/newUserList/"}
        listIsEmptyMsg={listIsEmpty}
    />;
};

export default NewUserList;