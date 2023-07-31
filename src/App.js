import './App.css';
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import EquipmentList from "./components/EquipmentList/EquipmentList";
import Form from "./components/Form/Form";
import Menu from "./components/Menu/Menu";

const tg = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        tg.ready();
    }, [])

    // const onClose = () => {
    //     tg.close()
    // }

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route index element={<Menu />}/>
            <Route path={'equipment'} element={<EquipmentList />}/>
            <Route path={'form'} element={<Form />}/>
        </Routes>
    </div>
  );
}

export default App;
