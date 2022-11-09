import React, { useState } from 'react';

import { Menu, MenuItem } from '@mui/material';

function DeployalbeMenu(props) {
    const { buttonType, options } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const buttonToInsert = React.cloneElement(
        buttonType,
        { 
            onClick: handleClickOpen,
            ariaControls: open ? 'long-menu' : undefined,
            ariaExpanded: open ? 'true' : undefined,
            ariaHaspopup: "true" 
        }
    );

    const ITEM_HEIGHT = 48;

    return ( 
        <>
            {buttonToInsert}
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {
                    options.map((option) => (
                        <MenuItem key={option.label} onClick={option.onClick}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
}

export default DeployalbeMenu;