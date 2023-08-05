import React from 'react';
import {IconButton, Stack, TextField} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ReagentsFormItem = (props) => {

    const {deleteReagent, onChangeReagent, reagent, index} = props;

    return (
        <Stack
            direction="rom"
            alignItems="center"
            spacing={2}
        >
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Название"
                    name="name"
                    value={reagent.name}
                    onChange={(e) => onChangeReagent(e, index)}
                    fullWidth
                    error={false}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Количество"
                    name="amount"
                    value={reagent.amount}
                    onChange={(e) => {
                        onChangeReagent(e, index)
                    }}
                    fullWidth
                    error={false}
                />

            </Stack>
            {index === 0 ? null :
                <IconButton aria-label="delete" size="large" onClick={() => deleteReagent(index)}>
                    <RemoveCircleOutlineIcon size="large" color="inherit"/>
                </IconButton>
            }
        </Stack>);
};

export default ReagentsFormItem;