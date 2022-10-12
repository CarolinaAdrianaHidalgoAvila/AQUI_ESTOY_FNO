import React, { useState, useEffect } from 'react';

import { TextField, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio, DatePicker  } from '@mui/material';

import useFetch from '../../hooks/useFetch';
import FormModal from './FormModal';

function NewPetForm(props) {
    const { post } = useFetch("http://localhost:5500/api/");

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
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
  

    function handleCreateUserSubmit(event){
        event.preventDefault();
        var pet = {
            namePet: name,
            gender: gender,
            hasNecklace:(hasQr == "true") ? true : false,
            specie: specie
        }
        post("users/6335dba37c28ccc604586936/pets", pet)
        .then(data => {
            console.log(data);
            if(data.namePet !== undefined){
                alert(`Nueva mascota ${data.namePet} creada!`);
                window.location.href = "/user";
            }
        })
        .catch(error => console.log(error));
    }

    return ( 
        <FormModal buttonName="Nueva Mascota" formTitle="Ingresa los datos de tu mascota" submitName="Crear Mascota" handleSubmit={handleCreateUserSubmit}>
            <div className='row justify-content-start'>
                <div className='col'>
                    <TextField id="form-pet-name" label="Nombre" variant="outlined" margin='normal' onChange={(e) => {setName(e.target.value)}} required />
                </div>
                <div className='col'>
                    <TextField id="form-pet-age" label="Cumpleaños" type="number" variant="outlined" margin='normal' onChange={(e) => {setBirthday(e.target.value)}} required />
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
    );
}
const species = [
    {label: "Perro"},
    {label: "Gato"},
    {label: "Loro"},
]

export default NewPetForm;