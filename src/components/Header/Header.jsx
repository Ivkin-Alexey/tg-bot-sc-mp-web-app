import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';


const Header = () => {
    const {tg, person, onClose} = useTelegram();

    useEffect(() => {
        tg.BackButton.isVisible = true;
    }, [])

    return (
        <header className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'personname'}>
                {person?.personname}
            </span>
        </header>
    );
};

export default Header;