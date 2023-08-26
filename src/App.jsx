import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import EquipmentList from "./pages/EquipmentList/EquipmentList";
import EditPersonalData from "./pages/EditPersonalData/EditPersonalData";
import Menu from "./pages/Menu/Menu";
import ApplicationList from "./pages/ApplicationList/ApplicationList";
import EquipmentCategoryList from "./pages/EquipmentCategoryList/EquipmentCategoryList"
import Reagents from "./pages/Reagents/Reagents.jsx";
import Application from "./pages/Application/Application";
import Profile from "./pages/Profile/Profile";

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
    }, [])

    return (
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
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'profile/editeProfile'} element={<EditPersonalData/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;
