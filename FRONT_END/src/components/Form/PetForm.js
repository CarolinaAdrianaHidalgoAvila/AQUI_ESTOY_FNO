import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';

import { TextField, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useFetch from '../../hooks/useFetch';
import FormModal from './FormModal';
import { IconButtonEdit } from '../Button/LittleButtons';
import { ButtonAccept } from '../Button/ButtonComp';

function NewPetForm(props) {
    const { userId } = props;
    const { post } = useFetch("http://localhost:5500/api/");

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
  

    function handleCreatePetSubmit(event){
        event.preventDefault();
        var pet = {
            namePet: name,
            gender: gender,
            hasNecklace:(hasQr === "true") ? true : false,
            specie: specie
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
                <div className='row justify-content-start'>
                    <div className='col'>
                        <TextField id="form-pet-name" label="Nombre" variant="outlined" margin='normal' onChange={(e) => {setName(e.target.value)}} required />
                    </div>
                    <div className='col'>
                        <DesktopDatePicker label="Cumpleaños" inputFormat="DD/MM/YYYY" value={birthday} onChange={(newValue) => {setBirthday(newValue)}}  renderInput={(params) => <TextField {...params} id="form-pet-birthday" variant="outlined" margin='normal'/>}/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <Autocomplete id="form-pet-spiece" disablePortal variant="outlined" margin='normal' options={species} inputValue={specie} onInputChange={(event, newSpecie) => {setSpecie(newSpecie)}} renderInput={
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
    {label: "Loro"},
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
            gender: gender,
            hasNecklace:(hasQr === "true") ? true : false,
            specie: specie
        }
        put(`users/${userId}/pets/${petId}`, pet)
        .then(data => {
            console.log(data);
            if(data.namePet !== undefined){
                alert(`mascota ${data.namePet} editada!`);
                window.location.href = "/user";
            }
        })
        .catch(error => console.log(error));
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