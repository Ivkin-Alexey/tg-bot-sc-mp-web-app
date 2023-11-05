import './App.css';
import {useCallback, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import EquipmentList from "./pages/EquipmentList/EquipmentList";
import EditPersonalData from "./pages/EditPersonalData/EditPersonalData";
import Menu from "./pages/Menu/Menu";
import ApplicationList from "./pages/ApplicationList/ApplicationList";
import EquipmentCategoryList from "./pages/EquipmentCategoryList/EquipmentCategoryList"
import Reagents from "./pages/Reagents/Reagents.jsx";
import Application from "./pages/Application/Application";
import UserProfile from "./pages/UserProfile/UserProfile";
import {useTelegram} from "./hooks/useTelegram";
import Statistic from "./components/Statistic/Statistic";
import ActiveEmployees from "./pages/ActiveEmployees/ActiveEmploees";
import ActiveEquipment from "./pages/ActiveEquipment/ActiveEquipment";
import NewUserPage from "./pages/Stepper/NewUserPage";
import UserList from "./pages/UserList/UserList";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import constants from "./assets/constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchResearchesAction, fetchUsersAction} from "./redux/actions";
import AdminList from "./pages/AdminList/AdminList";
import {SET_ACCOUNT_CHAT_ID} from "./redux/types";
import CircularProgress from "./components/CircularProgress/CircularProgress";
import * as React from "react";

function App() {

    const {tg, accountChatID = constants.defaultUserChatID} = useTelegram();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: SET_ACCOUNT_CHAT_ID, payload: accountChatID});
        dispatch(fetchUsersAction(accountChatID));
        dispatch(fetchResearchesAction());
        tg.BackButton.isVisible = true;
    }, []);

    const role = useSelector(state => state.users.accountData?.type);
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
                    <Route path={'reagents'} element={<Reagents/>}/>
                    <Route path={'equipment/:category'} element={<EquipmentList/>}/>
                    <Route path={'applications'} element={<ApplicationList/>}/>
                    <Route path={'applications/:application'} element={<Application/>}/>
                    <Route path={'statistic/activeEquipment'} element={<ActiveEquipment/>}/>
                    <Route path={'statistic/activeEmployees'} element={<ActiveEmployees/>}/>
                    <Route path={'userList'} element={<UserList/>}/>
                    <Route path={'userList/:chatID'} element={<UserProfile/>}/>
                    <Route path={'userList/:chatID/editProfile'} element={<EditPersonalData/>}/>
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
