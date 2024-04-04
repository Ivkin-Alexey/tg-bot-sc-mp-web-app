import React from 'react';
import {useSelector} from 'react-redux';
import localisations from "../../assets/constants/localisations/localisations";
import ListPage from "../ListPage/ListPage";

const NewPersonList = () => {
    const {newPersons} = useSelector(state => state.persons);
    const {subHeader, listIsEmpty} = localisations.pages.newPersonList;
    return <ListPage
        subHeader={subHeader}
        personList={newPersons}
        listItemPath={"/newPersonList/"}
        listIsEmptyMsg={listIsEmpty}
    />;
};

export default NewPersonList;