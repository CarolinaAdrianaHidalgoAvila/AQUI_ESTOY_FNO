import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

import { TextField, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useFetch from '../../hooks/useFetch';
import FormModal from './FormModal';
import { IconButtonEdit } from '../Button/IconButton';
import { ButtonAccept } from '../Button/ButtonComp';
import ProfilePictureInput from './ProfilePictureInput';

import Axios from 'axios';

function NewPetForm(props) {
    const { userId } = props;
    const { post } = useFetch(process.env.REACT_APP_BACKEND_URL);

    const [imageUpload, ] = useState({});
    const [, setImage] = useState({})
    const [logo, setLogo] = useState("")

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState(dayjs('2014-08-18T21:11:54'));
    const [specie, setSpecie] = useState("");
    const [gender, setGender] = useState("");
    const [hasQr, setHasQr] = useState("false");

    useEffect(() => {
        console.log(name);
        console.log(birthday);
        console.log(specie);
        console.log(gender);
        console.log(hasQr);
    }, [name, birthday, specie, gender, hasQr])

    async function uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
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

    async function handleCreatePetSubmit(event){
        event.preventDefault();
        imageUpload.image = logo;
        console.log(logo);
        if(logo !== ""){
            const image_url = await uploadProfilePicture(logo);
        }
        var pet = {
            namePet: name,
            birthDate: birthday.toISOString(),
            gender: gender,
            hasNecklace:(hasQr === "true") ? true : false,
            specie: specie
            //photo: image_url
        }
        post(`users/${userId}/pets`, pet)
        .then(data => {
            console.log(data);
            if(data.namePet !== undefined){
                alert(`Nueva mascota ${data.namePet} creada!`);
                window.location.href = "/user";
            }
        })
        .catch(error => console.log(error));
        return false;
    }

    const buttonNewPet = <ButtonAccept>Crear Mascota</ButtonAccept>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">  
            <FormModal formTitle="Ingresa los datos de tu mascota" submitName="Crear Mascota" handleSubmit={handleCreatePetSubmit} buttonType={buttonNewPet}>
                <div className='row justify-content-center'>
                    <ProfilePictureInput image={imageUpload.image} imageUpload={handlChangeProfilePicture}/>
                </div>
                <div className='row justify-content-start'>
                    <div className='col'>
                        <TextField id="form-pet-name" label="Nombre" variant="outlined" margin='normal' onChange={(e) => {setName(e.target.value)}} required />
                    </div>
                    <div className='col'>
                        <DesktopDatePicker label="Cumpleaños" inputFormat="DD/MM/YYYY" value={birthday} onChange={(newValue) => {setBirthday(newValue)}}  renderInput={(params) => <TextField {...params} id="form-pet-birthday" variant="outlined" margin='normal'/>}/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <Autocomplete id="form-pet-spiece" disablePortal freeSolo variant="outlined" margin='normal' options={species} inputValue={specie} onInputChange={(event, newSpecie) => {setSpecie(newSpecie)}} renderInput={
                        (params) => <TextField {...params} label="Especie" required />
                    } />
                    <FormLabel id="form-gender-radio-button">Genero: </FormLabel>
                    <RadioGroup row aria-labelledby="dform-gender-radio-button" name="form-gender-radio-button" margin='normal' required onChange={(e) => {setGender(e.target.value)}} >
                        <FormControlLabel value="M" control={<Radio />} label="Macho" />
                        <FormControlLabel value="H" control={<Radio />} label="Hembra" />
                    </RadioGroup>
                    <FormLabel id="form-hasQr-radio-button">¿Tiene un collar QR?</FormLabel>
                    <RadioGroup row aria-labelledby="dform-hasQr-radio-button" name="form-hasQr-radio-button" margin='normal' required onChange={(e) => {setHasQr(e.target.value)}} >
                        <FormControlLabel value="true" control={<Radio />} label="Si" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
            </FormModal>
        </LocalizationProvider>
    );
}
const species = [
    {label: "Perro"},
    {label: "Gato"},
    {label: "Hamster"},
    {label: "Loro"},
    {label: "Conejo"},
]

function EditPetForm(props) {
    const { put } = useFetch("http://localhost:5500/api/");
    const { userId, petId, pet } = props

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState(dayjs('2014-08-18T21:11:54'));
    const [gender, setGender] = useState("");
    const [hasQr, setHasQr] = useState("false");
    const [specie, setSpecie] = useState("");

    useEffect(() => {
        setName(pet.namePet);
        setBirthday(pet.birthDate)
        setGender(pet.gender);
        setHasQr(pet.hasNecklace);
        setSpecie(pet.specie)
    }, []);
  

    function handleEditPetSubmit(event){
        event.preventDefault();
        var pet = {
            namePet: name,
            birthDate: birthday.toISOString(),
            gender: gender,
            hasNecklace:(hasQr === "true") ? true : false,
            specie: specie,
            userID: userId
        }
        put(`users/${userId}/pets/${petId}`, pet)
        .then(data => {
            console.log(data);
            if(data.namePet !== undefined){
                alert(`mascota ${data.namePet} editada!`);
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            window.location.href = "/user";
        });
        return false;
    }

    const petButtonEdit = <IconButtonEdit />

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">  
            <FormModal formTitle="Ingresa los datos de tu mascota" submitName="Editar Mascota" handleSubmit={handleEditPetSubmit} buttonType={petButtonEdit}>
                <div className='row justify-content-start'>
                    <div className='col'>
                        <TextField id="form-pet-name" label="Nombre" variant="outlined" margin='normal' value={name} onChange={(e) => {setName(e.target.value)}} required />
                    </div>
                    <div className='col'>
                        <DesktopDatePicker label="Cumpleaños" inputFormat="DD/MM/YYYY" value={birthday} onChange={(newValue) => {setBirthday(newValue)}}  renderInput={(params) => <TextField {...params} id="form-pet-birthday" variant="outlined" margin='normal'/>}/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <Autocomplete id="form-pet-spiece" disablePortal variant="outlined" margin='normal' options={species} value={specie} inputValue={specie} onInputChange={(event, newSpecie) => {setSpecie(newSpecie)}} renderInput={
                        (params) => <TextField {...params} label="Especie" required />
                    } />
                    <FormLabel id="form-gender-radio-button">Genero: </FormLabel>
                    <RadioGroup row aria-labelledby="dform-gender-radio-button" name="form-gender-radio-button" margin='normal' required defaultValue={gender} onChange={(e) => {setGender(e.target.value)}} >
                        <FormControlLabel value="M" control={<Radio />} label="Macho" />
                        <FormControlLabel value="H" control={<Radio />} label="Hembra" />
                    </RadioGroup>
                    <FormLabel id="form-hasQr-radio-button">¿Tiene un collar QR?</FormLabel>
                    <RadioGroup row aria-labelledby="dform-hasQr-radio-button" name="form-hasQr-radio-button" margin='normal' required defaultValue={hasQr} onChange={(e) => {setHasQr(e.target.value)}} >
                        <FormControlLabel value="true" control={<Radio />} label="Si" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
            </FormModal>
        </LocalizationProvider>
    );
}

export { NewPetForm, EditPetForm };