import React, {useEffect} from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import {useEffect} from "@types/react";


const Header = () => {
    const {tg, user, onClose} = useTelegram();

    useEffect(() => {
        tg.BackButton.isVisible = true;
    }, [])

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;