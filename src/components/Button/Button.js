import React from 'react';
import {Button as MUIButton} from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Button = (props) => {

    return (
        <MUIButton className="button" color="tgBtn" {...props}/>
    );
};

export default Button;