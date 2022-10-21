import React, { useState, useEffect } from 'react';

import { Dialog, DialogTitle, DialogActions } from '@mui/material';

import {IconButtonAccept, IconButtonDelete, IconButtonReject} from '../Button/LittleButtons';

function ConfirmDialog(props) {
    const {handleCancel, handleAccept, dialogMessage, ...rest} = props;

    const [open, setOpen] = useState(false);

    function handleCancelClose(){
        handleCancel();
        setOpen(false);
    }

    function handleAcceptClose(){
        handleAccept();
        setOpen(false);
    }

    return ( 
        <>
            <Dialog
                open={true}
                onClose={handleCancelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                {...rest}
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogMessage}
                </DialogTitle>
                <DialogActions>
                    <IconButtonReject onClick={handleCancelClose} autoFocus />
                    <IconButtonAccept onClick={handleAcceptClose} />
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ConfirmDialog;