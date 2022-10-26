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

function NewPublicationForm(props) {
    const { userId } = props;
    const { post } = useFetch("http://localhost:5500/api/");

    const [name, setName] = useState("");
    const [species, setSpecie] = useState("");
    const [datePublication, setDate] = useState(dayjs('2014-08-18T21:11:54'));
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [reward, setReward] = useState("");

    useEffect(() => {
        /*console.log(name);
        console.log(species);
        console.log(datePublication);
        console.log(location);
        console.log(email);
        console.log(description);
        console.log(reward);*/
    }, [name, species, datePublication,location, email, description,reward])
  

    function handleCreatePublicationSubmit(event){
        event.preventDefault();
        var publication = {
            namePet: name,
            species:species,
            datePublication:datePublication,
            location: location,
            email: email,
            description: description,
            reward: reward

        }
        post(`users/${userId}/publications`, publication)
        .then(data => {
            console.log(data);
            if(data.namePet !== undefined){
                alert(`Nueva publicacion de mascota ${data.namePet}  perdida creada!`);
                window.location.href = "/user";
            }
        })
        .catch(error => console.log(error));
        return false;
    }

    const buttonNewPublication = <ButtonAccept>Crear Publicacion</ButtonAccept>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">  
            <FormModal formTitle="Ingresa los datos de tu mascota Perdida" submitName="Crear Publicacion" handleSubmit={handleCreatePublicationSubmit} buttonType={buttonNewPublication}>
                <div className='row justify-content-start'>
                    
                    <TextField type='text' id="form-publication-petName" label="Nombre de la mascota" variant="outlined" margin='normal' onChange={(e) => {setName(e.target.value)}} required />
                    <TextField type='text' id="form-pet-species" label="Especie de la mascota" variant="outlined" margin='normal' onChange={(e) => {setSpecie(e.target.value)}} required />
                    <DesktopDatePicker label="Fecha de publicacion" inputFormat="DD/MM/YYYY" value={datePublication} onChange={(newValue) => {setDate(newValue)}}  renderInput={(params) => <TextField {...params} id="form-publication-date" variant="outlined" margin='normal'/>}/>
                    <TextField type='text' id="form-publication-location" label="Localizacion de la perdida" variant="outlined" margin='normal' onChange={(e) => {setLocation(e.target.value)}} required />
                    <TextField  type='email' id="form-publication-email" label="Correo electronico" variant="outlined" margin='normal' onChange={(e) => {setEmail(e.target.value)}} required />
                    <TextField type='text' id="form-publication-description" label="Descripcion" variant="outlined" margin='normal' onChange={(e) => {setDescription(e.target.value)}} required />
                    <TextField type='number' id="form-publication-reward" label="Recompensa" variant="outlined" margin='normal' onChange={(e) => {setReward(e.target.value)}} required />
                </div>
                <div className='row justify-content-center'>
                </div>
            </FormModal>
        </LocalizationProvider>
    );
}

export { NewPublicationForm };