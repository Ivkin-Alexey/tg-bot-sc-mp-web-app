import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Equipments from "./pages/Equipments/Equipments";
import EditPersonalData from "./pages/EditPersonalData/EditPersonalData";
import Menu from "./pages/Menu/Menu";
import ApplicationList from "./pages/ApplicationList/ApplicationList";
import EquipmentCategoryList from "./pages/EquipmentCategoryList/EquipmentCategoryList"
import Reagents from "./pages/Reagents/Reagents.jsx";
import Application from "./pages/Application/Application";
import UserProfile from "./pages/UserProfile/UserProfile";
import {useTelegram} from "./hooks/useTelegram";
import NewUserPage from "./pages/Stepper/NewUserPage";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import constants from "./assets/constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchEquipmentsAction, fetchResearchesAction, fetchUsersAction} from "./redux/actions";
import AdminList from "./pages/AdminList/AdminList";
import {SET_ACCOUNT_CHAT_ID} from "./redux/types";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import * as React from "react";
import NewUserList from "./pages/NewUserList/NewUserList";
import NestedList from "./components/NestedList/NestedList";
import OperatingEquipments from "./pages/OperatingEquipments/OperatingEquipments";
import EmployList from "./pages/EmployList/EmployList";
import ReagentApplication from "./pages/ReagentApplication/ReagentApplication";

function App() {

    const {tg, accountChatID = constants.defaultUserChatID} = useTelegram();
    const dispatch = useDispatch();


    useEffect(() => {
        tg.expand();
        dispatch({type: SET_ACCOUNT_CHAT_ID, payload: accountChatID});
        dispatch(fetchUsersAction(accountChatID));
        dispatch(fetchResearchesAction());
        dispatch(fetchEquipmentsAction());
        tg.BackButton.isVisible = true;
    }, []);

    const role = useSelector(state => state.users.accountData?.role);
    const isUsersDataUpdated = useSelector(state => state.users.usersDataIsUpdated);
    const {admin, superAdmin} = constants.userRoles;
    const isAdmin = (role === admin || role === superAdmin);

    return (
        isUsersDataUpdated ?
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
                    <Route path={'newUserList'} element={<NewUserList/>}/>
                    <Route path={'newUserList/:chatID'} element={<UserProfile/>}/>
                    <Route path={'newUserList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'userList'} element={<NestedList/>}/>
                    <Route path={'userList/:chatID'} element={<UserProfile/>}/>
                    <Route path={'userList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'employList'} element={<EmployList/>}/>
                    <Route path={'employList/:chatID'} element={<AdminProfile/>}/>
                    <Route path={'employList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'/:chatID'} element={isAdmin ? <AdminProfile/> : <UserProfile/>}/>
                    <Route path={'/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'adminList'} element={<AdminList/>}/>
                    <Route path={'adminList/:chatID'} element={<AdminProfile/>}/>
                    <Route path={'adminList/:chatID/editProfile'} element={<EditPersonalData/>}/>
                    <Route path={'stepper'} element={<NewUserPage/>}/>
                </Routes>
            </main>
        </> : <CircularProgress/>
    );
}

export default App;
