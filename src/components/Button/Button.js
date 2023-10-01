import React from 'react';
import {Button as MUIButton} from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Button = (props) => {

    const theme = useTheme();

    return (
        <MUIButton className="button" theme={theme} color="tgBtn" {...props}/>
    );
};

export default Button;