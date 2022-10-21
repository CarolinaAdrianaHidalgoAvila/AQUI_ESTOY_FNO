import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton'

function IconButtonAccept(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='success' {...rest}>
            <CheckIcon />
        </IconButton>
    );
}

function IconButtonReject(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='error' {...rest}>
            <CloseIcon />
        </IconButton>
    );
}

function IconButtonEdit(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='info' {...rest}>
            <EditIcon />
        </IconButton>
    );
}


function IconButtonDelete(props) {
    const {...rest} = props
    return ( 
        <IconButton aria-label="icon-button-accept" color='error' {...rest}>
            <DeleteIcon />
        </IconButton>
    );
}

export { IconButtonAccept, IconButtonReject, IconButtonEdit, IconButtonDelete };