import React from 'react';
import './Menu.css';
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className={'menu'}>
            <Link to={'equipment'} className={'link'}>Оборудование</Link>
            <Link to={'form'} className={'link'}>Форма</Link>
        </div>
    );
};

export default Menu;