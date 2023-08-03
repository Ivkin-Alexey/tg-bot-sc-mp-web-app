import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function NestedList() {

    const equipment = [
        {category: 'Без категории', list: ['Тест падающего груза']},
        {category: 'Печи', list: ['Лоип 1', 'Лоип 2', 'Nabertherm', 'ПТК']},
        {category: 'Микроскопы', list: ['Микроскоп 1', 'Микроскоп 2', 'Микроскоп 3', 'Микроскоп 4', 'Микроскоп 5', 'Микроскоп 6', 'Микроскоп 7']},
        {category: 'Ситовые анализаторы', list: ['1', '2', '3', '4']}
    ];

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Выберите оборудование:
                </ListSubheader>
            }
        >
            {equipment.map(el => {
                return(
                <ListItemButton>
                    <ListItemText primary={el.category} />
                </ListItemButton>)
            })}
        </List>
    );
}
