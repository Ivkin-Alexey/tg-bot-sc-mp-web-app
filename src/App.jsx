import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Equipments from "./pages/Equipments/Equipments";
import EditPersonalData from "./pages/EditPersonalData/EditPersonalData";
import Menu from "./pages/Menu/Menu";
import ApplicationList from "./pages/ApplicationList/ApplicationList";
import EquipmentCategoryList from "./pages/EquipmentCategoryList/EquipmentCategoryList"
import Application from "./pages/Application/Application";
import UserProfile from "./pages/UserProfile/UserProfile";
import {useTelegram} from "./hooks/useTelegram";
import NewLaboratoryWorkerPage from "./pages/Stepper/NewLaboratoryWorkerPage";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import constants from "./assets/constants/constants";
import AdminList from "./pages/AdminList/AdminList";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import * as React from "react";
import NewPersonList from "./pages/NewPersonList/NewPersonList";
import NestedList from "./components/NestedList/NestedList";
import OperatingEquipments from "./pages/OperatingEquipments/OperatingEquipments";
import EmployList from "./pages/EmployList/EmployList";
import ReagentApplication from "./pages/ReagentApplication/ReagentApplication";
import { useFetchPersonQuery } from './store/api/persons.api';
import {useAppDispatch} from "./hooks/useAppDispatch";
import {useAppSelector} from "./hooks/useAppSelector";
import { setAccountData } from './store/reducers/personsSlice';

function App() {

    const {tg, accountChatID = constants.defaultPersonChatID} = useTelegram();
    const dispatch = useAppDispatch();
    const {data: personData, isLoading, isError, isFetching, isSuccess} = useFetchPersonQuery(accountChatID);

    if(isSuccess) dispatch(setAccountData(personData))

    useEffect(() => {
        tg.expand()
        tg.BackButton.isVisible = true
    }, [])

    const {role} = useAppSelector(state => state.persons.accountData);
    const {admin, superAdmin} = constants.personRoles;
    const isAdmin = (role === admin || role === superAdmin);

    return (
        isPersonsDataUpdated ?
        <>
            {/*<Header/>*/}
            <main className="main">
                <Routes>
                    <Route index element={<Menu/>}/>
                    <Route path={'equipment'} element={<EquipmentCategoryList/>}/>
                    <Route path={'operatingEquipment'} element={<OperatingEquipments/>}/>
                    <Route path={'reagents'} element={<ReagentApplication/>}/>
                    <Route path={'equipment/:category'} element={<Equipments/>}/>
                    <Route path={'applications'} element={<ApplicationList/>}/>
                    <Route path={'applications/:application'} element={<Application/>}/>
                    <Route path={'newPersonList'} element={<NewPersonList/>}/>
                    <Route path={'newPersonList/:chatID'} element={<UserProfile/>}/>
                    <Route path={'newPersonList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'personList'} element={<NestedList/>}/>
                    <Route path={'personList/:chatID'} element={<UserProfile/>}/>
                    <Route path={'personList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'employList'} element={<EmployList/>}/>
                    <Route path={'employList/:chatID'} element={<AdminProfile/>}/>
                    <Route path={'employList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'/:chatID'} element={isAdmin ? <AdminProfile/> : <UserProfile/>}/>
                    <Route path={'/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'adminList'} element={<AdminList/>}/>
                    <Route path={'adminList/:chatID'} element={<AdminProfile/>}/>
                    <Route path={'adminList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'stepper'} element={<NewLaboratoryWorkerPage/>}/>
                </Routes>
            </main>
        </> : <CircularProgress/>
    );
}

export default App;
