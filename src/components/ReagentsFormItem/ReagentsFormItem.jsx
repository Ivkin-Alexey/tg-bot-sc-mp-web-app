import React from 'react';
import {IconButton, Stack, TextField} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ReagentsFormItem = (props) => {

    const {inputs, data, index, deleteReagent, onChangeData, reagentsNumber} = props;

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
                    width={reagentsNumber <= 1 ? "350px" : "300px"}
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
                {reagentsNumber <= 1 ? null :
                    <IconButton aria-label="delete" size="large" onClick={() => deleteReagent(index)} sx={{marginLeft: "0"}}>
                        <RemoveCircleOutlineIcon size="large" color="inherit"/>
                    </IconButton>
                }
            </Stack>
        </>
    );
};

export default ReagentsFormItem;