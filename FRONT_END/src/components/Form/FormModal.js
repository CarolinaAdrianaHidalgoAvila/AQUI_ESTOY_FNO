import React, { useEffect, useState } from 'react';

import { ButtonAccept } from '../Button/ButtonComp';

import { Box, Typography, Modal } from '@mui/material';


function FormModal(props) {
    const {children, fromTitle, submitName, handleSubmit, buttonType} = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buttonToInsert = React.cloneElement(
        buttonType,
        { onClick: handleOpen }
    );

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

    function addExtraProps(Component, extraProps) {
        return <Component.type {...Component.props} {...extraProps} />;
    }

    function handleCloseSubmit(event){
        const closeModal = handleSubmit(event);
        setOpen(closeModal);
    }

    return ( 
        <>
            {addExtraProps(buttonType, { onClick: handleOpen })}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {fromTitle}
                    </Typography>
                    <form onSubmit={handleCloseSubmit}>
                        <div className='container'>
                            {children}
                            <div className="pt-1 mb-4">
                                <ButtonAccept type="submit">{submitName}</ButtonAccept>
                            </div>
                        </div>
                    </form>
                    
                </Box>
            </Modal>
        </>
    );
}

export default FormModal;