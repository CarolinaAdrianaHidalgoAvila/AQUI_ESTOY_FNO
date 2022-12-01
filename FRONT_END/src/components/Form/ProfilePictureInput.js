import React from 'react';

import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Input } from '@mui/material';


function ProfilePictureInput(props) {
    const {onChange} = props
    const defaultSx = {
        width: 100,
        height: 100,
    }
    return ( 
        <IconButton color="inherit" aria-label="upload picture" component="label" sx={defaultSx}>
            <Input hidden accept="image/*" type="file" onChange={onChange}/>
            <AccountCircleIcon sx={defaultSx}/>
        </IconButton>
    );
}

export default ProfilePictureInput;
