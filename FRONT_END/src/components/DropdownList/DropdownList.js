import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import React, { useState } from 'react';

function DropdownList(props) {
    const {name, children} = props;

    const [open, setOpen] = useState(false);

    return ( 
        <>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <ListItemButton onClick={(e) => setOpen(!open)}>
                    <ListItemText primary={name} primaryTypographyProps={{fontSize: 26}}/>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout='auto'>
                    {children}
                </Collapse>
            </List>
        </>
    );
}

export default DropdownList;