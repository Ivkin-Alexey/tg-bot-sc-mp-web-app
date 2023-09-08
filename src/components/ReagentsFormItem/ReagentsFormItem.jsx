import React from 'react';
import {IconButton, Stack, TextField} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "ReagentsFormItem.css"

const ReagentsFormItem = (props) => {

    const {inputs, data, index, deleteReagent, onChangeData} = props;

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    spacing={2}
                    width={"350px"}
                >
                    {inputs.map((el, i) => {
                        return <TextField
                            key={i}
                            onChange={e => onChangeData(e, index)}
                            fullWidth
                            error={false}
                            value={data[index][el.inputAttributes.name]}
                            {...el.inputAttributes}
                        />
                    })}
                </Stack>
                {index === 0 ? null :
                    <IconButton aria-label="delete" size="large" onClick={() => deleteReagent(index)} sx={{ml: "0"}}>
                        <RemoveCircleOutlineIcon size="large" color="inherit"/>
                    </IconButton>
                }
            </Stack>
        </>
    );
};

export default ReagentsFormItem;