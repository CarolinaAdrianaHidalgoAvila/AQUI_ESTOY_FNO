import React, { useState, useEffect, useRef } from 'react';

import { TextField, Alert, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import useFetch from '../../hooks/useFetch';
import FormModal from './FormModal';
import { ButtonCheck } from '../Button/ButtonComp';
import ProfilePictureInput from './ProfilePictureInput';
import Axios from 'axios';
import AlertSnackbar from '../AlertMessage/AlertSnackbar';

function NewUserForm(props) {
    const { post } = useFetch(process.env.REACT_APP_BACKEND_URL);

    const [imageUpload, ] = useState({});
    const [, setImage] = useState({})
    const [logo, setLogo] = useState("")

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

    async function uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ProfilePictures");
        let data = "";
        await Axios.post(process.env.REACT_APP_CLOUDINARY_API_URL + "/image/upload", formData)
        .then((response) => {
            data = response.data["secure_url"];
        });
        return data;
    }


    function handlChangeProfilePicture(event){
        if(event.target.files[0]) {
            setImage({
                src: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            })
            setLogo(event.target.files[0]);
        }
    }


    async function handleCreateUserSubmit(event){
        event.preventDefault();
        if(!validateEmail(eMail)){
            setEMailValidation(true);
            return true;
        } else {
            setEMailValidation(false);
        }

        if(password != confirmPassword) {
            setPasswordValidation(true);
            return true;
        } else { 
            setPasswordValidation(false);
        }

        imageUpload.image = logo;
        var image_url = null
        if(logo !== "") {
            image_url = await uploadProfilePicture(logo);
        }
        console.log(image_url);

        var user = {
            firstName: firstName,
            lastName: lastName,
            phone: telephone,
            email: eMail,
            address: address,
            photo: image_url,
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
        return false;
    }

    const buttonRegisterUser = <Link underline='hover'>Registrarse</Link>

    return ( 
        <div>
            <FormModal formTitle="Registrar un nuevo usuario" submitName="Registarse" handleSubmit={handleCreateUserSubmit} buttonType={buttonRegisterUser} id="form-user-register">
                <div className='row justify-content-center'>
                    <ProfilePictureInput image={imageUpload.image} imageUpload={handlChangeProfilePicture}/>
                </div>
                <div className='row justify-content-center' style={{color: "grey", fontSize: 18}}>
                    Ingresar una foto de perfil
                </div>
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
                        {eMailValidation && <Alert severity="error"> El e-mail introducido no es valido </Alert>}
                        <TextField id="form-user-cellphone" label="Telefono" variant="outlined" type="number" margin='normal' required onChange={(e) => {setTelephone(e.target.value)}} />
                        <TextField id="form-user-direction" label="Direccion" variant="outlined" margin='normal' onChange={(e) => {setAddress(e.target.value)}} />
                        <TextField id="form-user-password" label="Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setPassword(e.target.value)}} required error={passwordValidation} />
                        <TextField id="form-user-confirm-password" label="Confirmar Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} required error={passwordValidation}/>
                        {passwordValidation && <Alert severity="error"> Las contraseñas no coinciden </Alert>}
                    </div>    
                </div>
            </FormModal>
        </div>
    );
}

function EditUserForm(props) {
    const { userId, user } = props;
    const { put } = useFetch("http://localhost:5500/api/");

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
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setTelephone(user.phone);
        setEMail(user.email);
        setAddress(user.address);
    }, []);

    function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    function handleEditUserSubmit(event){
        event.preventDefault();
        if(!validateEmail(eMail)){
            setEMailValidation(true);
            return true;
        } else {
            setEMailValidation(false);
        }

        if(password != confirmPassword || password == "") {
            setPasswordValidation(true);
            return true;
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

        put(`users/${userId}`, user)
        .then(data => {
            console.log(data);
            if(data.name !== undefined) {
                alert(`Usuario  ${data.name} editado correctamente!`);
                
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            window.location.href = "/user";
        });
        return false;
    }

    const buttonToEditUser = <ButtonCheck startIcon={<EditIcon />}>Editar Usuario</ButtonCheck>

    return ( 
        <div>
            <FormModal formTitle="Editar los datos del usuario" submitName="Editar" handleSubmit={handleEditUserSubmit} buttonType={buttonToEditUser}>
                <div className='container'>
                    <div className='row justify-content-start'>
                        <div className='col'>
                            <TextField id="form-user-first-name" label="Nombre" variant="outlined" margin='normal' value={firstName} onChange={(e) => {setFirstName(e.target.value)}} required />
                        </div>
                        <div className='col'>
                            <TextField id="form-user-last-name" label="Apellido" variant="outlined" margin='normal' value={lastName} onChange={(e) => {setLastName(e.target.value)}} required />
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <TextField id="form-user-email" label="E-Mail" variant="outlined" margin='normal' value={eMail} onChange={(e) => {setEMail(e.target.value)}} required error={eMailValidation} />
                        {eMailValidation && <Alert severity="error"> El e-mail introducido no es valido </Alert>}
                        <TextField id="form-user-cellphone" label="Telefono" variant="outlined" type="number" margin='normal' required value={telephone} onChange={(e) => {setTelephone(e.target.value)}} />
                        <TextField id="form-user-direction" label="Direccion" variant="outlined" margin='normal' value={address} onChange={(e) => {setAddress(e.target.value)}} />
                        <TextField id="form-user-password" label="Nueva Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setPassword(e.target.value)}} error={passwordValidation} />
                        <TextField id="form-user-confirm-password" label="Confirmar Nueva Contraseña" variant="outlined" margin='normal' type="password" onChange={(e) => {setConfirmPassword(e.target.value)}} error={passwordValidation}/>
                        {passwordValidation && <Alert severity="error"> Las contraseñas no coinciden </Alert>}
                    </div>    
                </div>
            </FormModal>
        </div>
    );
}

export {NewUserForm, EditUserForm};