import {CircularProgress as MUICircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

const CircularProgress = () => {

    return <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <MUICircularProgress/>
    </Box>
};

export default CircularProgress;