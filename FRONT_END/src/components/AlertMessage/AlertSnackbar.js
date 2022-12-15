import React, { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function AlertSnackbar(props) {
    const {isOpen, severity, message } = props;

    const [open, setOpen] = useState(isOpen);

    function handleClose(event, reason) {
        if(reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return ( 
        <>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AlertSnackbar;