import React, { useState, useEffect } from 'react';

import { TextField } from '@mui/material';

import useFetch from '../../hooks/useFetch';
import FormModal from './FormModal';

function NewUserForm(props) {
    const { post } = useFetch("http://localhost:5500/api/");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [eMail, setEMail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [eMailValidation, setEMailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);


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

        if(password !== confirmPassword) {
            setPasswordValidation(true);
            return ;
        } else { 
            setPasswordValidation(false);
        }
        var user = {
            firstName: firstName,
            lastName: lastName,
            phone: telephone,
            eMail: eMail,
            address: address,
        }

        post("users", user)
        .then(data => {
            console.log(data);
            if(data.name !== undefined) {
                alert(`Nueva usuario ${data.name} creada!`);
                window.location.href = "/";
            }
        })
        .catch(error => console.log(error));
    }

    return ( 
        <div>
            <FormModal buttonName="Crear Usuario" formTitle="Registrar un nuevo usuario" submitName="Registarse" handleSubmit={handleCreateUserSubmit}>
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
                        <TextField id="form-user-cellphone" label="Telefono" variant="outlined" type="number" margin='normal' required onChange={(e) => {setTelephone(e.target.value)}} />
                        <TextField id="form-user-direction" label="Direccion" variant="outlined" margin='normal' onChange={(e) => {setAddress(e.target.value)}} />
                        <TextField id="form-user-password" label="Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setPassword(e.target.value)}} required error={passwordValidation} />
                        <TextField id="form-user-confirm-password" label="Confirmar Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} required error={passwordValidation}/>
                    </div>
                    {eMailValidation && <p style={{color: "red"}}> El e-mail introducido no es valido</p>}
                    {passwordValidation && <p style={{color: "red"}}> Las contraseñas no coinciden</p>}
                    </div>
            </FormModal>
        </div>
    );
}

export default NewUserForm;