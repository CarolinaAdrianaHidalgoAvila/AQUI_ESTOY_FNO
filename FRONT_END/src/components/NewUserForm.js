import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

function NewUserForm(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [eMail, setEMail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [eMailValidation, setEMailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    useEffect(() => {
        if(eMailValidation || passwordValidation){
            setOpen(true);
        }
    }, [eMailValidation, passwordValidation])
 
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

    function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    function handleCreateUserSubmit(event){
        event.preventDefault();
        if(!validateEmail(eMail)){
            setEMailValidation(true);
            return ;
        } else {
            setEMailValidation(false);
        }

        if(password != confirmPassword) {
            setPasswordValidation(true);
            return ;
        } else { 
            setPasswordValidation(false);
        }

        setOpen(false);

        /*
        var user = {
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
            address: address,
            password: password
        }

        fetch("URL_HERE", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);S
        })
        .catch((error) => {
            console.log("Error:", error);
        })
        .finally(() => {
            setOpen(false);
        })
        */
    }

    return ( 
        <div>
            <Button onClick={handleOpen}>Registar Usuario</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Registrar un nuevo usuario
                    </Typography>
                    <form onSubmit={handleCreateUserSubmit}>
                        <div className='container'>
                            <div className='row justify-content-start'>
                                <div className='col'>
                                    <TextField id="form-user-first-name" label="Nombre" variant="outlined" margin='normal' onChange={(e) => {setFirstName(e.target.value)}} required />
                                </div>
                                <div className='col'>
                                    <TextField id="form-user-last-name" label="Apellido" variant="outlined" margin='normal' onChange={(e) => {setLastName(e.target.value)}} required />
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <TextField id="form-user-email" label="E-Mail" variant="outlined" margin='normal' onChange={(e) => {setEMail(e.target.value)}} required error={eMailValidation} />
                                <TextField id="form-user-cellphone" label="Telefono" variant="outlined" type="number" margin='normal' onChange={(e) => {setTelephone(e.target.value)}} />
                                <TextField id="form-user-direction" label="Direccion" variant="outlined" margin='normal' onChange={(e) => {setAddress(e.target.value)}} />
                                <TextField id="form-user-password" label="Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setPassword(e.target.value)}} required error={passwordValidation} />
                                <TextField id="form-user-confirm-password" label="Confirmar Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} required error={passwordValidation}/>
                            </div>
                            {eMailValidation && <p style={{color: "red"}}> El e-mail introducido no es valido</p>}
                            {passwordValidation && <p style={{color: "red"}}> Las contraseñas no coinciden</p>}
                            <div className="pt-1 mb-4">
                                <input type="submit" value="Registrarse" className="btn btn-dark btn-lg btn-block" />
                            </div>
                        </div>
                    </form>
                    
                </Box>
            </Modal>
        </div>
    );
}

export default NewUserForm;