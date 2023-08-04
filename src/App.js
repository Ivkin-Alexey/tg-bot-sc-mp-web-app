import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import EquipmentList from "./pages/EquipmentList/EquipmentList";
import Form from "./pages/Form/Form";
import Menu from "./pages/Menu/Menu";
import ApplicationList from "./pages/ApplicationList/ApplicationList";
import EquipmentCategoryList from "./pages/EquipmentCategoryList/EquipmentCategoryList"

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<Menu/>}/>
                <Route path={'equipment'} element={<EquipmentCategoryList/>}/>
                <Route path={'equipment/:category'} element={<EquipmentList/>}/>
                <Route path={'applications'} element={<ApplicationList/>}/>
                <Route path={'form'} element={<Form/>}/>
            </Routes>
        </>
    );
}

export default App;
