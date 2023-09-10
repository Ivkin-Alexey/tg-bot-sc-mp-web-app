import React from 'react';
import {Button as MUIButton} from "@mui/material";
import "./Button.css"

const Button = (props) => {
    return (
        <MUIButton className="button" {...props}/>
    );
};

export default Button;