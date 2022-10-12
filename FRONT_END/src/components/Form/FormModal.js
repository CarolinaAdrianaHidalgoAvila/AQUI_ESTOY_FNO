import React, { useState } from 'react';

import ButtonComp from '../Button/ButtonComp';

import { Box, Typography, Modal } from '@mui/material';


function FormModal(props) {
    const {children, buttonName, fromTitle, submitName, handleSubmit} = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    return ( 
        <>
            <ButtonComp  onClick={handleOpen}>{buttonName}</ButtonComp>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {fromTitle}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className='container'>
                            {children}
                            <div className="pt-1 mb-4">
                                <ButtonComp type="submit">{submitName}</ButtonComp>
                            </div>
                        </div>
                    </form>
                    
                </Box>
            </Modal>
        </>
    );
}

export default FormModal;