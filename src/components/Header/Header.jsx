import React, {useEffect} from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';


const Header = () => {
    const {tg, user, onClose} = useTelegram();

    useEffect(() => {
        tg.BackButton.isVisible = true;
    }, [])

    return (
        <header className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </header>
    );
};

export default Header;